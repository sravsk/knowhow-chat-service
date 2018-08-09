import React from 'react';
import ReactDOM from 'react-dom';
import Chat from '../components/Chat.jsx';

class EmbeddableChatService extends React.Component {
  //static property
  static el;

  //es7 static method 
  static mount() {
    const component = <Chat/>;

    function doRender() {
      console.log("is this dorender() working?")
      if (EmbeddableChatService.el) {
        throw new Error('EmbeddableChatService is already mounted, unmount first');
      }

      //using hashid module in browser by appending hashid.min.js to the knowhow-widget div element
      const el = document.createElement('div');
      el.setAttribute('class', 'knowhow-chat-service');

     // const widgetEl = document.getElementsByClassName('knowhow-widget');
      //console.log('widgetEl', widgetEl)
      //widgetEl.append(el)
      //document.body.appendChild(el);

      document.getElementsByClassName('knowhow-chat-wrapper')[0].appendChild(el);
      ReactDOM.render(
        component,
        el
      );
      EmbeddableChatService.el = el;
    }

    //check if load event is about to fire.
    if (document.readyState === 'complete') {
      doRender();
    } else {
      window.addEventListener('load', () => {
        doRender();
      });
    }
  }

 // static method to unmount widget
  static unmount() {
    if (!EmbeddableChatService.el) {
      throw new Error('EmbeddableChatService is not mounted, mount first');
    }
    ReactDOM.unmountComponentAtNode(EmbeddableChatService.el);
    EmbeddableChatService.el.parentNode.removeChild(EmbeddableChatService.el);
    EmbeddableChatService.el = null;
  }
}

export default EmbeddableChatService;
