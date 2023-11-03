import {LitElement, html, css} from 'lit';
import Dynamsoft from 'dwt';

export class DocumentScanner extends LitElement {
  static properties = {
  };
  DWObject;
  static styles = css`
    :host {
      display: block;
    }
    #dwtcontrolContainer {
      width: 100%;
      height: 100%;
    }
    `;
  constructor() {
    super();
    Dynamsoft.DWT.AutoLoad = false;
    Dynamsoft.DWT.ResourcesPath = "/dwt/dist";
  }

  render() {
    return html`<div id="dwtcontrolContainer"></div>`;
  }

  firstUpdated() {
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
          const event = new CustomEvent('initialized', {
            detail: {
              DWObject: pThis.DWObject
            }
          });
          pThis.dispatchEvent(event);
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
