import { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Envelope, Clipboard } from 'react-bootstrap-icons';
import { Email as emailLink } from '../refLinks';

import '../styles/email.scss';
import '../styles/icon-jiggle.scss';

const EmailState  = {
  Initial: 0,
  Hidden: 1,
  Visible: 2,
}

export default class Email extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animationState: EmailState.Initial,
      showCopy: false,
    };
  }

  render() {
    function CssDescription(envelope = '', envelopeContainer = '', emailText = '') {
      return {
        envelope: envelope,
        envelopeContainer: envelopeContainer,
        emailText: emailText,
      };
    }

    const cssList = [
      CssDescription(),
      CssDescription('envelope-open', 'envelope-container-open', 'email-text-close'),
      CssDescription('envelope-close', 'envelope-container-close', 'email-text-open'),
    ];

    const cssForState = cssList[this.state.animationState];
    const envelopeCss = cssForState.envelope;
    const envelopeContainerCss = cssForState.envelopeContainer;
    const emailTextCss = cssForState.emailText;

    let copiedElement;
    if (this.state.showCopy) {
      copiedElement = <span className="copied-element text-dark">Copied!</span>
    }

    return (
      <Nav.Item
        className="navbar-text email-container"
        onPointerEnter={() => this.pointerEnter()}
        onPointerLeave={() => this.pointerLeave()}  
      >
        <span
          className={`email-text ${emailTextCss}`}
          onClick={() => this.copyEmail()}
        >
          {emailLink}
          <Clipboard className="icon-jiggle" />
        </span>
        <div className={`envelope-container ${envelopeContainerCss}`}>
          <Envelope className={`envelope ${envelopeCss}`} />
        </div>
        {copiedElement}
      </Nav.Item>
    );
  }

  pointerEnter() {
    this.setState({ animationState: EmailState.Visible });
  }

  pointerLeave() {
    this.setState({ animationState: EmailState.Hidden });
  }

  copyEmail() {
    navigator.clipboard.writeText(emailLink).then(() => {
      this.setState({ showCopy: true });
      setTimeout(() => {
        this.setState({ showCopy: false });
      }, 1000);
    });
  }
}