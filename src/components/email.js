import { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Envelope, Clipboard } from 'react-bootstrap-icons';

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
      email: 'michael.d.fryer@gmail.com',
      animationState: EmailState.Initial,
    };
  }

  render() {
    function CssDescription(envelope = '', envelopeContainer = '', emailText = '')
    {
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
          {this.state.email}
          <Clipboard className="icon-jiggle" />
        </span>
        <div className={`envelope-container ${envelopeContainerCss}`}>
          <Envelope className={`envelope ${envelopeCss}`} />
        </div>
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
    navigator.clipboard.writeText(this.state.email).then(() => {
      // TODO add a little "Copied!" thingy when it's successful instead of this alert
      alert("Copied!");
    });
  }
}