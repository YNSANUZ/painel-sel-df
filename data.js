(function(root){
  const modalities=['Ginástica acrobática','Nado artístico','Natação','Deep water','Musculação','Saltos ornamentais','Alongamento','Karatê'];
  const support=[{name:'Nacional',people:316,investment:478602.40},{name:'Internacional',people:173,investment:1539450.49},{name:'Terrestre',people:1284,investment:890139.53}];
  const programs=[
    {id:'escola',name:'Escola de Esportes',tag:'Formação e qualidade de vida',icon:'book',photo:'swim.jpg',logo:'escola.png',color:'blue',description:'Prática esportiva para crianças, adolescentes, adultos, idosos e pessoas com deficiência. Conheça as modalidades e consulte as informações de inscrição.',url:'https://esporte.df.gov.br/escola-de-esportes/',period:'2º semestre de 2025',metric:'2 mil+',metricLabel:'alunos beneficiados'},
    {id:'compete',name:'Compete Brasília',tag:'Apoio a atletas e paratletas',icon:'trophy',photo:'running.jpg',logo:'compete.png',color:'green',description:'Apoio à participação de atletas e paratletas em competições nacionais e internacionais por meio de transporte aéreo e terrestre.',url:'https://esporte.df.gov.br/compete/',period:'1º semestre de 2024',metric:'1.773',metricLabel:'beneficiados'},
    {id:'bolsa',name:'Bolsa Atleta',tag:'Incentivo ao esporte',icon:'medal',description:'Acesse a página oficial para consultar o programa, seus critérios e documentos.',url:'https://esporte.df.gov.br/bolsa-atleta/'},
    {id:'gol',name:'Gol de Placa',tag:'Esporte para Todos',icon:'ball',description:'Subprojeto do Esporte para Todos. Consulte no portal da Secretaria as orientações sobre apoio com materiais esportivos.',url:'https://esporte.df.gov.br/esporte-para-todos/'},
    {id:'cops',name:'Centros Olímpicos e Paralímpicos',tag:'Esporte e inclusão',icon:'people',logo:'cops.png',description:'Espaços de prática esportiva e inclusão em diferentes regiões do Distrito Federal. Veja as unidades listadas no documento e explore o mapa.',url:'https://esporte.df.gov.br/cops/'},
    {id:'lei',name:'Lei de Incentivo ao Esporte',tag:'Projetos e desenvolvimento',icon:'file',logo:'lei.png',description:'Incentivo fiscal para o financiamento de projetos esportivos e paraesportivos no Distrito Federal.',url:'https://esporte.df.gov.br/lei-de-incentivo-ao-esporte/'},
    {id:'todos',name:'Esporte para Todos',tag:'Cidadania e inclusão social',icon:'heart',description:'Iniciativas de incentivo à prática esportiva no DF. Informações e documentos disponíveis no portal oficial.',url:'https://esporte.df.gov.br/esporte-para-todos/'}
  ];
  const centers=['Brazlândia','Recanto das Emas','Ceilândia — Setor O','Santa Maria','Ceilândia — Parque da Vaquejada','Sobradinho','Estrutural','São Sebastião','Gama','Riacho Fundo','Planaltina','Samambaia'];
  const venues=['Ginásio de Esportes de Samambaia','Parque Aquático Cláudio Coutinho','Parque da Cidade Dona Sarah Kubitschek','Pavilhão de Exposições do Parque da Cidade','Estádio Bezerrão','Estádio Joaquim Domingos Roriz','Estádio Augustinho Lima','Estádio Abadião'];
  const fields=['Planaltina','Gama — QD 8, Setor Sul','COP Samambaia — QN 319','COP Vaquejada — QNP 21','Ceilândia — EQNN 01/03','Taguatinga — QNJ 03/05','Samambaia — 311','Sobradinho — COP'];
  const spaces=[...centers.map(name=>({name:'COP '+name,type:'centro'})),...venues.map(name=>({name,type:'espaco'})),...fields.map(name=>({name:'Campo — '+name,type:'campo'}))];
  const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const filterPrograms=q=>programs.filter(p=>normalize(p.name+' '+p.tag).includes(normalize(q)));
  const filterSpaces=(type,q='')=>spaces.filter(s=>(type==='todos'||s.type===type)&&normalize(s.name).includes(normalize(q)));
  const mapURL='https://www.google.com/maps/d/embed?mid=1lMvcLrOFOl1jZ8hZt7y_c1SAw3QDnTc&ehbc=2E312F';
  const api={programs,spaces,modalities,support,filterPrograms,filterSpaces,mapURL};
  if(typeof module!=='undefined')module.exports=api;else root.SEL=api;
})(typeof window!=='undefined'?window:this);
