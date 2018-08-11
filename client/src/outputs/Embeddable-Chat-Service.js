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
      if (EmbeddableChatService.el) {
        throw new Error('EmbeddableChatService is already mounted, unmount first');
      }
      const el = document.createElement('div');
      el.setAttribute('class', 'knowhow-chat-service');
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
