// declare variables related to Minu Object
let menuItem1 = document.querySelector("#menu1");
let menuItem2 = document.querySelector("#menu2");
let menuItem3 = document.querySelector("#menu3");
let menuItem4 = document.querySelector("#menu4");
let menuItem5 = document.querySelector("#menu5");
// let menuItemsList = [menuItem1, menuItem2, menuItem3, menuItem4, menuItem5];
let toolBarToggler = document.querySelector(".toolbar-toggler");
let toolbarContent = document.getElementById("toolbarContent");
let iconBarContent = document.getElementById("iconBarContent");
let logoutUserIcon = document.getElementById("logoutUserIcon");
let logOutContent = document.getElementById("logOutContent");
let isPin = true;
let togglingIconBtn = false;
let toggelLogOutBtn = false;
let isOpen = true;
let lastOpendMenu = [];
let showiconBarContent = `<nav class="navbar navbar-expand-lg navbar-light bg-primary-3">
      <div class="container-fluid">
        <div class="">
          <ul class="row">
            <li class="list-unstyled  col-3">
              <i onclick='Minu.popUpMsg()' class="fas fa-user-plus"></i>
            </li>
            <li  class="list-unstyled col-3">
              <i onclick='Minu.popUpMsg()' class="fas fa-ambulance"></i>
            </li>
            <li class="list-unstyled col-3">
              <i onclick='Minu.popUpMsg()' class="fas fa-anchor"></i>
            </li>
          </ul>
        </div>
        
      </div>
    </nav>`;

// declar Vars which is related to leftSideBar Object
let leftSideContainer = document.querySelector("#left-side-bar-container");
// Menu object
class Minu {
  constructor() {
    this.logOut();
  }
  //   method to toggel toolbar and invke pin method if needed
  showToolbar(minuItem) {
    minuItem.addEventListener("click", () => {
      if (isPin) {
        if (lastOpendMenu.includes(minuItem.id)) {
          lastOpendMenu.splice(lastOpendMenu.indexOf(minuItem.id), 1);
        } else {
          lastOpendMenu.push(minuItem.id);
        }

        // open btns bar & icon bar if pin is active and refuse close it
        toolbarContent.innerHTML = this.toolbarBtns(
          minuItem.getAttribute("data-key")
        );
        toolbarContent.style.opacity = 1;
        iconBarContent.style.opacity = 1;
        setTimeout(() => {
          iconBarContent.innerHTML = showiconBarContent;
        }, 200);
        togglingIconBtn = false;
      } else {
        if (lastOpendMenu.includes(minuItem.id)) {
          lastOpendMenu.splice(lastOpendMenu.indexOf(minuItem.id), 1);

          // close both toolbar and icon bar
          toolbarContent.style.opacity = "0";
          iconBarContent.style.opacity = "0";
          setTimeout(() => {
            toolbarContent.innerHTML = "";
            iconBarContent.innerHTML = "";
          }, 200);
        } else {
          lastOpendMenu = [];
          lastOpendMenu.push(minuItem.id);

          // close both toolbar and icon bar
          toolbarContent.style.opacity = 0;
          iconBarContent.style.opacity = 0;
          setTimeout(() => {
            toolbarContent.innerHTML = "";
            iconBarContent.innerHTML = "";
          }, 200);
          // open another one
          // open btns bar if pin is not active
          toolbarContent.style.opacity = 1;
          setTimeout(() => {
            toolbarContent.innerHTML = this.toolbarBtns(
              minuItem.getAttribute("data-key")
            );
          }, 600);

          // open icon bar if pin is not active
          iconBarContent.style.opacity = 1;
          setTimeout(() => {
            iconBarContent.innerHTML = showiconBarContent;
          }, 600);
          togglingIconBtn = false;
        }

        togglingIconBtn = true;
      }
    });

    toolBarToggler.addEventListener("click", () => {
      if (toolbarContent.style.opacity == 1) {
        toolbarContent.style.opacity = "0";
        iconBarContent.style.opacity = "0";
        setTimeout(() => {
          toolbarContent.innerHTML = "";
          iconBarContent.innerHTML = "";
        }, 400);
      }
    });
  }
  // pin and unpin toolbar

  static pinToolbar(e) {
    if (isPin) {
      isPin = false;
      e.style.color = "grey";
    } else {
      isPin = true;
      e.style.color = "red";
      console.log(e);
    }
  }
  // show and display icon bar
  static showIcon(e) {
    if (togglingIconBtn) {
      iconBarContent.style.opacity = 1;
      setTimeout(() => {
        iconBarContent.innerHTML = showiconBarContent;
      }, 200);
      togglingIconBtn = false;
    } else {
      iconBarContent.style.opacity = "0";
      setTimeout(() => {
        iconBarContent.innerHTML = "";
      }, 200);
      togglingIconBtn = true;
    }
  }
  // pop up alert messege
  static popUpMsg() {
    alert(`are you sure?`);
  }
  // log out method
  logOut() {
    logoutUserIcon.addEventListener("click", () => {
      if (!toggelLogOutBtn) {
        toggelLogOutBtn = true;
        logOutContent.innerHTML = `<button  onclick='Minu.popUpMsg()' type="button" class="btn btn-secondary">log out</button>`;
      } else {
        toggelLogOutBtn = false;
        logOutContent.innerHTML = "";
      }
    });
  }

  // render toolbar content
  toolbarBtns(key) {
    return `
       <nav class="navbar navbar-expand-lg navbar-light bg-primary-2">
      <div class="container-fluid">
        <div class="" id="toolbarBtnsId">
          <ul class="m-auto row">
            <li class="list-unstyled col-3 mx-3 badge-list">
              <span class="badge bg-success badge-menu-${key}-btn-1 badge-btn"  onclick='Minu.showIcon(this)' >Menu${key}-Button1</span>
            </li>
            <li class="list-unstyled col-3 mx-1 badge-list">
              <span class="badge bg-primary badge-menu-${key}-btn-2 badge-btn" onclick='Minu.showIcon(this)'>Menu${key}-Button2</span>
            </li>
            <li class="list-unstyled col-3 mx-2 badge-list">
              <span class="badge bg-warning badge-menu-${key}-btn-3 badge-btn" onclick='Minu.showIcon(this)'>Menu${key}-Button3</span>
            </li>
            </ul>
            </div>
            <i class="fas fa-thumbtack" onclick='Minu.pinToolbar(this)' style="color: ${
              isPin ? "red" : "grey"
            }"></i>
            </div>
    </nav>`;
  }
}
verticalLine = document.querySelector("#verical-line-container ");
// left side bar object
class LeftSideBar {
  constructor() {
    this.opneLeftSideBtn = document.querySelectorAll(".open-left-btn");
    this.isShown = false;
  }

  show() {
    document.querySelector(".leftSideBarCanvas").style.transform = "none";
    verticalLine.style.left = "359px";
  }
  static hide() {
    document.querySelector(".leftSideBarCanvas").style.transform =
      "translateX(-100%)";
    verticalLine.style.left = "1px";
  }
  toggleLeftSideBar() {
    for (let btn of this.opneLeftSideBtn) {
      btn.addEventListener("click", () => {
        this.show();
      });
    }
  }
  showLeftSideBar() {
    leftSideContainer.innerHTML = this.leftSideContent(letfSideData);
    this.toggleLeftSideBar();
  }
  // open and close dir method
  static openDir(e, dirName) {
    setTimeout(() => {
      if (isOpen) {
        isOpen = false;
        document.getElementById(dirName).style.display = "none";
      } else {
        isOpen = true;
        document.getElementById(dirName).style.display = "block";
      }
    }, 100);
  }
  // close all dir Method
  static closeAllDirs(e) {
    let i, tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    setTimeout(() => {
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
    }, 500);
    isOpen = false;
    LeftSideBar.hide();
  }
  leftSideContent(data) {
    return `
    <div class=" leftSideBarCanvas" onmouseleave="LeftSideBar.hide()">
    <!--Start left side top buttons--->

            <div class="left-side-top-btns">
            <button>one</button>
            <button>two</button>
            <button>three</button>
            <button>four</button>
            </div>
    <!----Start letf side dir------->
            <div >

            <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasScrollingLabel"></h5>
            <button type="button" class="btn-close text-reset"
            onclick="LeftSideBar.closeAllDirs('tabcontent')"></button>
            </div>
            <div class="offcanvas-body">
            <!---- [1] direcory one ----->
            <div class="${data.name}-container" id="${data.name}Id" style="cursor: pointer;"  onclick="LeftSideBar.openDir(event, 'dir2and3')">
            <i class="far fa-folder-open"></i> ${data.name} 
            </div>

            <div id="dir2and3" class="tabcontent">
            <!---- [2] direcory two ----->

  <div class="row">
    <div class="col-1"> <div class="vertical-line"></div></div>
      <div class="col-10 my-3" > 
      <span style="cursor: pointer;"  onclick="LeftSideBar.openDir(event, 'file1and2')"> <i class="far fa-folder-open"></i> ${data.children[0].name}</span>

<div class="tabcontent" id="file1and2"> 
 <div class="row" >
          <div class="col-1"> <div class="vertical-line"></div></div>
            <div class="col-9 my-3"> 
              <div>
               <i class="far fa-file"></i> ${data.children[0].children[0].name}
              </div>
              <div> 
               <i class="far fa-file"></i> ${data.children[0].children[1].name}

              </div>
            </div>
        </div>
</div>
       
      </div>
  </div>
           
  
 
            <!---- [3] direcory three ----->
  <div class="row">
    <div class="col-1"> <div class="vertical-line"></div></div>
      <div class="col-10 my-3">
      
      <span style="cursor: pointer;" onclick="LeftSideBar.openDir(event, 'file3and4')">
       <i class="far fa-folder-open"></i> ${data.children[1].name}</span>

<div class="tabcontent" id="file3and4">
        <div class="row">
          <div class="col-1"> <div class="vertical-line"></div></div>
            <div class="col-9 my-3"> 
              <div>
                <i class="far fa-file"></i> ${data.children[1].children[0].name}
              </div>
              <div> 
                <i class="far fa-file"></i> ${data.children[1].children[1].name}

              </div>
            </div>
        </div>
</div>

      </div>
  </div>
  <!--end dir 2 and 3-->
            
            </div>


            </div>
            </div>
</div>
            `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let menu1 = new Minu();
  menu1.showToolbar(menuItem1);
  let menu2 = new Minu();
  menu2.showToolbar(menuItem2);
  let menu3 = new Minu();
  menu3.showToolbar(menuItem3);
  let menu4 = new Minu();
  menu4.showToolbar(menuItem4);
  let menu5 = new Minu();
  menu5.showToolbar(menuItem5);

  let leftSideBar1 = new LeftSideBar();
  leftSideBar1.showLeftSideBar();
});
