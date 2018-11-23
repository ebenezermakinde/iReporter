//Variable declaration.
const openSideBar = document.getElementById('open-sidebar');
const closeSideBar = document.getElementById('close-sidebar');

//function to handle sidebar menu slide open operation.
const openSlideMenu = () => {
    document.getElementById('side-menu').style.width = '200px';
 }

//function to handle side-bar menu close operation.
const closeSlideMenu = () => {
    document.getElementById('side-menu').style.width = '0';
 }

 openSideBar.addEventListener('click', () => {
     //calls the function.
    openSlideMenu()
 });

 closeSideBar.addEventListener('click', () => {
    //calls the function.
   closeSlideMenu();
});