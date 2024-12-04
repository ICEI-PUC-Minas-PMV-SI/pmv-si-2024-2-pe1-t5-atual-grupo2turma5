const app = (() => {
	'use strict';
	const pub = {};
	// Lorem ipsum - texto fictício* para enchimento
	const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

	const tipos = ["Compromisso", "Evento", "Tarefa"];

	const reset = sessionStorage.getItem("reset") == "R";

	function randi(n = 1) {
		return ((Math.random() * n) << 0);
	}

	function formatar_data(data) {
		return [
			data.getFullYear(),
			('0' + (data.getMonth() + 1)).slice(-2),
			('0' + data.getDate()).slice(-2)
		].join('-');
	}

	const query = new URLSearchParams(location.search); // https://[...]?data=YYYY-MM-dd => "data": "YYYY-MM-dd"
	let [_ano, _mes, _dia] = query.get("data")?.split("-")?.map(e => Number(e)) ?? [-Infinity, 0, 0];
	let data_ativa = new Date(_ano, _mes - 1, _dia);
	if (Number.isNaN(data_ativa.valueOf())) { // se não houver ?data=YYYY-MM-dd na URL, usar data atual
		location.replace(location.href + "?data=" + formatar_data(new Date()));
		return;
	}

	let navegacao = JSON.parse(sessionStorage.getItem("navegação"));
	if (navegacao == null || reset) {
		navegacao = { locale: "default", tema_escuro: false };
		sessionStorage.setItem("navegação", JSON.stringify(navegacao));
	}

	function rand_offset(num) {
		let offset = randi(0x17E - num);
		return num = (num + offset) % 0xFF;
	}

	const cores = [ // R, G, B
		[0x7D, 0x11, 0x11], [0xFF, 0x59, 0x5E], [0xFF, 0x92, 0x4C], [0xFF, 0xCA, 0x3A], [0xA3, 0xC9, 0x30],
		[0x7D, 0xED, 0xEB], [0x19, 0x82, 0xC4], [0x34, 0x41, 0x82], [0x76, 0x55, 0xA3], [0xD6, 0x77, 0xB8]
	];
	let hue_index = 0;
	function gerar_cor() {
		const base = cores[hue_index % cores.length];
		let [r, g, b] = base;
		if (hue_index >= cores.length) {
			r = rand_offset(r);
			g = rand_offset(g);
			b = rand_offset(b);
		}
		hue_index++;
		return '#' + ((r << 16) + (g << 8) + b).toString(16);
	}

	let contador_tag = 1;
	function gerar_tag() {
		const tag = {};
		tag.id = contador_tag++;
		tag.nome = "Etiqueta " + tag.id;
		tag.cor = gerar_cor();
		tag.usos = 0;
		return tag;
	}

	function gerar_n_tags(n = 10) {
		const tags = Array(10);
		for (let i = 0; i < n; i++)
			tags[i] = gerar_tag();
		return tags;
	}

	let lista_tags = JSON.parse(sessionStorage.getItem("lista-tags")); // Resgatar a lista do sessionStorage
	if (lista_tags == null || reset) { // Na primeira vez o sessionStorage retorna nulo
		lista_tags = gerar_n_tags(); // Popular a lista com dados padrao/ficticios
		sessionStorage.setItem("lista-tags", JSON.stringify(lista_tags)); // Guardar a lista no sessionStorage
	}

	let contador_item = 1;
	function gerar_item(data_mes_alvo, n_dias, tags_len) {
		const item = {};
		item.id = contador_item++;
		item.tipo = (2 + randi(4)) % 3; // Tendencioso c=.25 e=.25 t=.5
		data_mes_alvo.setDate(1 + randi(n_dias));
		data_mes_alvo.setHours(8 + randi(13), randi(2) * 30, 0, 0);
		item.data = data_mes_alvo.getTime();
		item.nome = tipos[item.tipo] + " " + item.id;
		item.desc = lorem;
		const r_len = 1 + randi(3) % tags_len;
		item.tags = Array(r_len);
		for (let i = 0; i < r_len; i++) {
			const r = i + randi(tags_len - i); // Pescador
			item.tags[i] = lista_tags[r];
			lista_tags[r].usos = lista_tags[r].usos + 1;
			lista_tags[r] = lista_tags[i];
			lista_tags[i] = item.tags[i];
		}
		return item;
	}

	function gerar_itens_mes(data, n = 12) {
		const fim = (new Date(data.getFullYear(), data.getMonth() + 1, 0)).getDate();
		const itens = Array(n);
		for (let i = 0; i < n; i++)
			itens[i] = (gerar_item(data, fim, lista_tags.length));
		return itens;
	}

	let lista_itens = JSON.parse(sessionStorage.getItem("lista-itens"));
	if (lista_itens == null || reset) {
		lista_itens = gerar_itens_mes(new Date(data_ativa.getFullYear(), data_ativa.getMonth() - 1, 1))
			.concat(gerar_itens_mes(new Date(data_ativa)))
			.concat(gerar_itens_mes(new Date(data_ativa.getFullYear(), data_ativa.getMonth() + 1, 1)));
		sessionStorage.setItem("lista-itens", JSON.stringify(lista_itens));
		sessionStorage.setItem("lista-tags", JSON.stringify(lista_tags)); // Salvar alterações de tag.usos
	}

	const icones_tipo = ["circle", "star", "square"];

	const fmt_estampa = new Intl.DateTimeFormat(navegacao.locale, { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", hour12: false });

	const qs = (q) => document.querySelector(q);

	let d_temp = new Date(data_ativa);
	d_temp.setHours(0, 0, 0, 0);
	d_temp.setDate(1);
	const inicio_mes = d_temp.getTime();
	const fim_mes = (new Date(d_temp.getFullYear(), d_temp.getMonth() + 1, 1)).getTime();
	d_temp.setDate(d_temp.getDate() - d_temp.getDay());
	const semana_ativa = Math.ceil((data_ativa.getDate() - 1 - data_ativa.getDay()) / 7);
	const semanas = Array(6);
	let flag_semana_ativa = false;
	const itens_semana_ativa = [];
	for (let i = 0; i < semanas.length; i++) {
		const d_semana_fmt = formatar_data(d_temp);
		flag_semana_ativa = (semana_ativa == i);
		semanas[i] = `<div class="semana${flag_semana_ativa ? " ativa" : ""}"><a href="semana.html?data=${d_semana_fmt}" class="pure-button lean"><span class="material-symbols-sharp">open_in_new</span></a>`;
		const dias = Array(7);
		for (let j = 0; j < dias.length; j++) {
			const d_dia_fmt = formatar_data(d_temp);
			const str_dia = ('0' + d_temp.getDate()).slice(-2);
			const inicio_dia = d_temp.getTime();
			d_temp.setDate(d_temp.getDate() + 1);
			const inicio_prox_dia = d_temp.getTime();
			let contagem_tipo = [0, 0, 0];
			const cards_itens_dia = [];
			for (const item of lista_itens) {
				if (item.data < inicio_dia || inicio_prox_dia <= item.data) continue;
				contagem_tipo[item.tipo]++;
				if (!flag_semana_ativa) continue;
				cards_itens_dia.push(`
					<div class="card">
						<a href="config_item.html?id=${item.id}">
							<h4 class="item-tit">${item.nome}</h4>
						</a>
						<p class="item-desc"><a href="config_item.html?id=${item.id}">${item.desc}</a></p>
						${item.tags.map(e => `<a href="#${e.id}" class="item-tag" style="background: ${e.cor.toString(16)};"><h5>${e.nome}</h5></a>`).join("\n")}
						<h4 class="estampa">${fmt_estampa.format(item.data)}</h4>
					</div>`);
			}
			if (flag_semana_ativa && cards_itens_dia.length > 0) {
				itens_semana_ativa.push(`
				<div class="row">
					<h3><a href="dia.html?data=${d_dia_fmt}">Dia ${str_dia}</a></h3>
					${cards_itens_dia.join("\n")}
				</div>`);
			}
			const icones_dia = contagem_tipo.map((e, i) => `${e > 0 ? `<h2 class="dia-item item-${i}"><span class="material-symbols-sharp">${icones_tipo[i]}</span>x${e}</h2>` : ""}`).join("\n");
			dias[j] =
				`<a href="dia.html?data=${d_dia_fmt}" class="dia${inicio_dia < inicio_mes || fim_mes <= inicio_dia ? " inativo" : ""}">
					<h2 class="dia-numero">${str_dia}</h2>
					${icones_dia}
				</a>`;
		}
		if (flag_semana_ativa) {
			qs("#itens-semana").innerHTML = itens_semana_ativa.join("\n");
			flag_semana_ativa = false;
		}
		semanas[i] += dias.join("\n") + "</div>";
	}
	qs("#mes").innerHTML = semanas.join("\n");



	d_temp.setFullYear(2024, 11, 1); // Qualquer domingo
	const nome_dia_semana = new Intl.DateTimeFormat(navegacao.locale, { weekday: "short" });
	let acc = "";
	for (let i = 0; i < 7; i++) {
		acc += `<h2>${nome_dia_semana.format(d_temp)}</h2>`;
		d_temp.setDate(d_temp.getDate() + 1);
	}
	qs("#semana-header").innerHTML = acc;

	const mes_ext = new Intl.DateTimeFormat(navegacao.locale, { month: "long" }).format(data_ativa);
	qs("#mes-nome").textContent = mes_ext;
	document.title = `Agenda - ${mes_ext} - organize.me`;
	qs("#ano-nome").textContent = data_ativa.getFullYear().toString();

	d_temp.setFullYear(data_ativa.getFullYear(), data_ativa.getMonth() - 1, 1);
	qs("#mes-decr").href = "?data=" + formatar_data(d_temp);
	d_temp.setFullYear(data_ativa.getFullYear(), data_ativa.getMonth() + 1, 1);
	qs("#mes-incr").href = "?data=" + formatar_data(d_temp);
	d_temp.setFullYear(data_ativa.getFullYear() - 1, data_ativa.getMonth(), 1);
	qs("#ano-decr").href = "?data=" + formatar_data(d_temp);
	d_temp.setFullYear(data_ativa.getFullYear() + 1, data_ativa.getMonth(), 1);
	qs("#ano-incr").href = "?data=" + formatar_data(d_temp);

	let inicio = d_temp.setFullYear(data_ativa.getFullYear(), data_ativa.getMonth(), data_ativa.getDate() - data_ativa.getDay());
	d_temp.setDate(d_temp.getDate() + 6);
	qs("#semana-nome").textContent = new Intl.DateTimeFormat(navegacao.locale, { month: "2-digit", day: "2-digit" }).formatRange(inicio, d_temp);
	d_temp.setDate(d_temp.getDate() - 13);
	qs("#semana-decr").href = "?data=" + formatar_data(d_temp);
	d_temp.setDate(d_temp.getDate() + 14);
	qs("#semana-incr").href = "?data=" + formatar_data(d_temp);


	qs("#filtro-tags").insertAdjacentHTML("beforeend",
		lista_tags.map(tag => `<a href="#" class="item-tag toggle tri-state" style="background: ${tag.cor.toString(16)};" data-toggle="blank" data-tag="${tag.id}"><span>${tag.nome} (${tag.usos})</span></a>`).join("\n"));


	const filtro = { pesquisa: "", tipos: [true, true, true], tags: { incluir: new Set(), excluir: new Set() }, intervalo: { inicio: -Infinity, fim: Infinity } };
	function filtrar() {
		const res = lista_itens.filter(
			(item) => {
				const tags_item = new Set(item.tags.map(e => e.id));
				return filtro.tipos[item.tipo]
					&& (filtro.intervalo.inicio <= item.data)
					&& (item.data <= filtro.intervalo.fim)
					&& (filtro.tags.excluir.size == 0 || !(filtro.tags.excluir.isSubsetOf(tags_item)))
					&& (filtro.tags.incluir.size == 0 || filtro.tags.incluir.isSubsetOf(tags_item))
					&& (item.nome.includes(filtro.pesquisa) || item.desc.includes(filtro.pesquisa));
			});
		qs("#resultados-pesquisa").innerHTML = res.map(
			(item) => {
				return `<div class="card">
					<a href="config_item.html?id=${item.id}">
						<h4 class="item-tit">${item.nome}</h4>
					</a>
					<p class="item-desc"><a href="config_item.html?id=${item.id}">${item.desc}</a></p>
					${item.tags.map(e => `<a href="#${e.id}" class="item-tag" style="background: ${e.cor.toString(16)};"><h5>${e.nome}</h5></a>`).join("\n")}
					<h4 class="estampa">${fmt_estampa.format(item.data)}</h4>
				</div>`
			}).join("\n");
	}

	const toggles = { blank: 0, check: 1, cross: 2 };
	qs("#filtro-tags").addEventListener("click", (e) => {
		if (e.target.tagName != "A") return;
		const next = (toggles[e.target.dataset.toggle] + 1) % 3;
		e.target.dataset.toggle = Object.keys(toggles)[next];
		const tag = Number(e.target.dataset.tag);
		switch (next) {
			case 0: filtro.tags.excluir.delete(tag); break;
			case 1: filtro.tags.incluir.add(tag); break;
			case 2: filtro.tags.incluir.delete(tag); filtro.tags.excluir.add(tag); break;
			default: break;
		}
		filtrar();
	});
	qs("#filtro-tipos").addEventListener("click", (e) => {
		if (e.target.tagName != "A") return;
		const c = e.target.dataset.toggle != "check";
		e.target.dataset.toggle = c ? "check" : "cross";
		filtro.tipos[Number(e.target.dataset.tipo)] = c;
		filtrar();
	});
	document.querySelectorAll("input").forEach(e => e.value = "");
	qs("#filtro-intervalo").addEventListener("change", (e) => {
		filtro.intervalo[e.target.name] = e.target.valueAsNumber;
		if (filtro.intervalo.fim < filtro.intervalo.inicio)
			[filtro.intervalo.inicio, filtro.intervalo.fim] = [filtro.intervalo.fim, filtro.intervalo.inicio];
		filtrar();
	});
	qs("#pesquisa").addEventListener("keyup", (e) => {
		filtro.pesquisa = e.target.value;
		filtrar();
	});
	// pub.randi = randi;
	// pub.formatar_data = formatar_data;
	// pub.get_data_ativa = () => new Date(data_ativa);
	return pub;
})();

