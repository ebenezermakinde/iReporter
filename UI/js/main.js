//Variable declaration
const navToggler = document.getElementById('nav-toggler');
const siderNav = document.getElementById('sider-nav');

const toggleSideNav = function(){
	siderNav.classList.toggle('side-nav.visible');
};

navToggler.addEventListener('click', () => {
	toggleSideNav();
});