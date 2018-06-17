	/* good(name,country,color,size,phone,image){
		return { //vozvr obiect gde 
			name,country,color,size,phone,image
		}
	}*/
const good = (name,country,color,size,price,description,image) => ({name,country,color,size,price,description,image})
const log = (text,type,date = new Date()) => ({text,type,date})

const goods = [ //massiv tovarov
	good('Рубашка','Турция','Хаки','M','750 лей','ФАСОН Relaxed fit - Состав Хлопок 100%','img/m1.jpeg'),
	good('Рубашка','Турция','Голубой','L','650 лей','ФАСОН Regular fit - Состав Хлопок 100%','img/m3.jpeg'),
	good('Рубашка','Италия','Голубой','M','750 лей','ФАСОН Regular fit - Состав Хлопок 100%','img/m6.jpeg'),
	good('Майка','Италия','Серый','M','350 лей',' СОСТАВ Хлопок 90%; Вискоза 10% ','img/m2.jpeg'),
	good('Толстовка','Италия','Белый','S','400 лей','СОСТАВ Хлопок 100%','img/m4.jpeg'),
	good('Поло','Италия','Синий в полоску','S','350 лей','СОСТАВ Хлопок 57%; Полиэстер 43%','img/m7.jpeg'),
	good('Поло','Франция','Желтый','S','350 лей','Полиэстер 100%','img/m8.jpeg'),
	good('Футболка','Китай','Синий','S','300 лей','СОСТАВ Вискоза 100%','img/m5.jpeg')
]
	
new Vue ({
	el:'#app', //initializatia prilojenia 
	data:{ //soderjit obiect 
		goods:goods,
		good:goods[0], //hraniatsa danii vibranogo 
		logs:[], //dlia vivoda logov o sdelanom zakaze
		selectedGoodIndex:0,
		descriptionVisibility: false,
		search: '',//peremennaia poiska
		modalVisibility: false
	},
	methods:{
		selectGood(index){
			this.good = goods[index]
			this.selectedGoodIndex = index
		},
		newOrder(){
			this.modalVisibility = false
			this.logs.push(
				log(`Заказ успешно сделан! ${this.good.name}, Цвет: ${this.good.color}, Размер: ${this.good.size}, Цена: ${this.good.price}`, 'ok')
				)
		},
		cancelOrder(){
			this.modalVisibility = false
		}
	},
	computed:{ //vicislenie functii ukazani znacenia
		descriptionBtnText(){
			return this.descriptionVisibility ? 'Скрыть описание товара ': 'Показать описание товара '
		},
		filteredGoods(){//otfiltruem skisok vseh tovarov
			var self = this
			//sozd noii massiv - rezultat massiva goods
			const filtered = this.goods.filter(function (good){//novii massiv
				return good.name.indexOf(self.search) > -1   //-1 vernet 
			})
			return filtered
		}
	},
	filters:{
		date(value){ //value = newdate
			return value.toLocaleString()

		}
	}
})