import { Diplomas, Fish, ArcadiaThumbnail, GitHub, LinkedIn, Resume, YouTube } from '../refLinks';

import '../styles/about.scss';

export default function About() {
  return (
    <div>
      <h1 className="display-2">About</h1>
      <div className="lead about-entry">Hello there! I am Michael Fryer, a Software Engineer that graduated from <a target="_blank" rel="noreferrer" href="https://www.mtech.edu">Montana Technological University</a> in 2019 with a Bachelor of Science in Software Engineering and a Bachelor of Science in Computer Science with emphasis in Game Design. During the graduation ceremony I was awarded an award for <em>Outstanding Achievement in the Department of Computer Science.</em></div>

      <div className="about-entry">I have previously worked at Heavy Iron Studios in LA as an Associate Game Developer. During my tenure at Heavy Iron, I was the lead UI developer on PacMan: Mega Tunnel Battle. In addition to my responsibilities on the game UI, I also created the Dev Ops portal that our client would use once the game was shipped. After leaving for personal reasons, I have been pursuing my passion for content creation. Over the course of these years, I have grown both my YouTube channel and my Twitch channel. By dedicating myself to working on content creation I was invited to become part of a content creation team where I would work collaboratively with other members to create entertaining content. This journey has let me develop many skills I wouldn't have otherwise. This includes video editing, image editing, project management, and leadership.</div>

      <div className="about-entry">
        <div className="about-img-container-right">
          <img className="about-img" src={Diplomas} alt="Diplomas Pog"></img>
        </div>
        <span className="about-text">During my schooling at Montana Tech, I served as the Secretary to my school's student chapter of ACM in 2017-2018 and as the President in 2018-2019. Before becoming the Secretary in 2016, I volunteered to work for one of the local museums in town, the Butte Science Mine, on a project called Digital Signage. The project's vision is to bring more interactive exploration-based digital interfaces to the museum that helps children and adults learn more about a subject. Helping with that project secured my club roughly $4,000 for a future industry trip we took to Seattle where we visited companies such as Microsoft, Valve, and a couple start-ups. As the Secretary, and again as the President, I helped my department get accredited as a testing site for the ICPC regionals meaning schools from all around Montana can commute to Butte to compete in the competition as opposed to the next closest testing site in Colorado. Many smaller schools, including ourselves, would not have been able to compete in the competition if there was not a local testing site.</span>
      </div>

      <div className="about-entry">
        <div className="about-img-container-left">
          <img className="about-img" src={ArcadiaThumbnail} alt="Arcadia Pog"></img>
        </div>
        <span className="about-text">In my free time I love to pursue my hobbies of playing video games and creating video game content. In 2021 I started creating Minecraft content on <a target="_blank" rel="noreferrer" href={YouTube}>YouTube</a>. Over these years I have gained 500 subscribers and have felt my skills as a creator and editor grow. Starting this hobby allowed me the opportunity to become part of a Survival Multiplayer server, or SMP. By working together with the other members of Arcadia SMP we have created a wonderful world for viewers to enjoy. One of my favorite projects on Arcadia was creating a deckbuilder for my fellow members to enjoy. I did everything from scratch, from card design, card balance, and "programming" in Minecraft. A fellow server member helped my with the card art but everything else was done by yours truly. When the game finally released, it was so amazing to see how many of my server members became addicted to it. Seeing this project through from start to finish was highly rewarding and has given me more ideas on how to go about similar projects in the future.</span>
      </div>

      <div className="about-entry">
        <div className='about-img-container-right'>
          <img className="about-img" src={Fish} alt="Fish Pog"></img>
        </div>
          <span className="about-text">Additionally, I love to get outdoors, especially during the summer. Getting some sun and kayaking on the lake is one of life's great pleasures. Any time I can get out and do some early morning fishing is a good day in my book. In the fall of 2024 I caught the biggest rainbow I've ever seen. It weighed in around 4.5 pounds!</span>
      </div>

      <div className="about-entry">If you made it this far, thanks for reading through all that. There are links to my <a target="_blank" rel="noreferrer" href={GitHub}>GitHub</a>, <a target="_blank" rel="noreferrer" href={LinkedIn}>LinkedIn</a>, and a download for my <a target="_blank" rel="noreferrer" href={Resume} download="Michael_Fryer_Resume.pdf">resume</a> here as well as in the footer.</div>
    </div>
  );
}