import PhotoSwipeLightbox from "../libs/PhotoSwipe/photoswipe-lightbox.esm.min.js"
import "../styles/main.scss"


new Swiper(".swiper", {
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},

	pagination: {
		el: ".swiper-pagination",
		// clickable: true,
		dynamicBullets: true,
	},

	autoHeight: true,

	slidesPerView: 1,

	watchOverflow: true,

	spaceBetween: 50,

	// loop: true,

	// breakpoints: {
	// 	320: {
	// 		slidesPerView: 1,
	// 	},

	// 	767.98: {
	// 		slidesPerView: 1.5,
	// 	}
	// }
})


window.onload = function () {
	setTimeout(function () {
		document.body.classList.add("loaded")

		if (window.matchMedia("(min-width: 992px)").matches) {
			// If not mobile

			Draggable.create(".gallery", {
				bounds: ".gallery-section",
				inertia: true,
			})
		}
	}, 200)
}

document.querySelectorAll(".gallery__item").forEach(function (e) {
	let img = new Image(),
		hrefURL = e.getAttribute("href")
	img.onload = function () {
		e.dataset.pswpWidth = this.width
		e.dataset.pswpHeight = this.height
	}
	img.src = hrefURL
})

const lightbox = new PhotoSwipeLightbox({
	gallery: ".gallery",
	children: ".gallery__item",
	pswpModule: () => import("../libs/PhotoSwipe/photoswipe.esm.min.js"),
})
lightbox.init()

// Загружаем JSON файл
fetch("data/branches.json")
	.then(response => {
		if (!response.ok) {
			throw new Error("Ошибка загрузки JSON")
		}
		return response.json() // Преобразуем ответ в объект
	})
	.then(data => {
		initBranchSelector(data) // Передаем данные в функцию для обработки
	})
	.catch(error => {
		console.error("Ошибка:", error)
	})

// обработки данных
function initBranchSelector(branches) {
	const selectors = document.querySelectorAll(".branch-selector")

	// Функция для обновления данных на странице
	function updateBranchData(selectedBranch) {
		const branchData = branches[selectedBranch]

		if (!branchData) {
			console.error("Данные филиала не найдены для:", selectedBranch)
			return
		}

		// Обновляем контактные данные на странице
		document.querySelectorAll(".socials__fb").forEach(el => {
			el.href = branchData.facebook
		})
		document.querySelectorAll(".socials__inst").forEach(el => {
			el.href = branchData.instagram
		})
		document.querySelectorAll(".contacts__whatsapp").forEach(el => {
			el.href = branchData.whatsapp
		})
		document.querySelectorAll(".contacts__tel").forEach(el => {
			el.href = branchData.phoneHREF
		})
		document.querySelectorAll(".contacts__tel").forEach(el => {
			el.textContent = branchData.phone
		})
		document.querySelectorAll(".contacts__location").forEach(el => {
			el.textContent = branchData.address
		})
		document.querySelectorAll(".mapFrame").forEach(el => {
			el.src = branchData.location
		})
	}

	// Функция для синхронизации значений всех селекторов
	function syncSelectors(selectedBranch) {
		selectors.forEach(selector => {
			if (selector.value !== selectedBranch) {
				selector.value = selectedBranch
			}
		})
	}

	// Добавляем обработчики событий для всех селекторов
	selectors.forEach(selector => {
		selector.addEventListener("change", function () {
			const selectedBranch = this.value

			// Обновляем данные и синхронизируем селекторы
			updateBranchData(selectedBranch)
			syncSelectors(selectedBranch)
		})
	})

	// Инициализация: устанавливаем начальное состояние
	if (selectors.length > 0) {
		const initialBranch = selectors[0].value // Используем значение первого селектора
		updateBranchData(initialBranch)
		syncSelectors(initialBranch)
	}
}
