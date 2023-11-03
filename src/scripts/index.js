import '../styles/index.scss';
import { DocumentScanner } from './documentscanner'; // eslint-disable-line
let DWObject;
window.onload = function(){
  let scanner = document.querySelector("document-scanner");
  scanner.addEventListener("initialized",function(e){
    console.log(e);
    DWObject = e.detail.DWObject;
  });
  document.getElementsByClassName("scan-button")[0].addEventListener("click",function(){
    scan();
  });
  document.getElementsByClassName("save-button")[0].addEventListener("click",function(){
    save();
  });
};

function scan(){
  if (DWObject) {
    DWObject.SelectSource(function () {
      DWObject.OpenSource();
      DWObject.AcquireImage();
    },
      function () {
        console.log("SelectSource failed!");
      }
    );
  }
}

function save(){
  if (DWObject) {
    DWObject.SaveAllAsPDF("Scannd.pdf");
  }
}