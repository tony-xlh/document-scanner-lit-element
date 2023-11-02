import {LitElement, html, css} from 'lit';
import Dynamsoft from 'dwt';

export class DocumentScanner extends LitElement {
  static properties = {
    initialized: {},
  };
  DWObject;
  static styles = css`/* playground-fold */

    :host {
      display: inline-block;
      min-width: 4em;
      text-align: center;
      padding: 0.2em;
      margin: 0.2em 0.1em;
    }
    #dwtcontrolContainer {
      width: 100%;
      height: 100%;
    }
    /* playground-fold-end */`;

  constructor() {
    super();
    Dynamsoft.DWT.AutoLoad = false;
    Dynamsoft.DWT.ResourcesPath = "/dwt/dist";
  }

  render() {
    return html`<div id="dwtcontrolContainer"></div><button class="scan-button">Scan</button>`;
  }

  registerEvent(){
    let scanButton = this.renderRoot.querySelector(".scan-button");
    let pThis = this;
    scanButton.addEventListener("click",function(){
      pThis.DWObject.SelectSource(function () {
        pThis.DWObject.OpenSource();
        pThis.DWObject.AcquireImage();
      },
        function () {
          console.log("SelectSource failed!");
        }
      );
    });
  }

  firstUpdated() {
    this.registerEvent();
    let pThis = this;
    let dwtContainer = this.renderRoot.getElementById("dwtcontrolContainer");
    Dynamsoft.DWT.Containers = [{ ContainerId: 'dwtcontrolContainer',Width: 270, Height: 350 }];
    Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', function () {
      Dynamsoft.DWT.CreateDWTObjectEx(
        {
          WebTwainId: 'dwtcontrol'
        },
        function(obj) {
          pThis.DWObject = obj;
          pThis.DWObject.Viewer.bind(dwtContainer);
          pThis.DWObject.Viewer.show();
          pThis.DWObject.Viewer.width = "100%";
          pThis.DWObject.Viewer.height = "100%";
          console.log(dwtContainer);
          window.DWObject = pThis.DWObject;
        },
        function(err) {
          console.log(err);
        }
      );
    });
    Dynamsoft.DWT.Load();
  } 
}
customElements.define('document-scanner', DocumentScanner);
