import { GitHub, LinkedIn } from '../refLinks';

export default function About() {
  return (
    <div>
      <h1 className="display-2">About</h1>
      <p class="lead">Hello there. I am Michael Fryer a Software Engineer that graduated from <a target="_blank" href="https://www.mtech.edu">Montana Tech</a> in 2019 with a Bachelors in Software Engineering and Computer Science with emphasis in Game Design. During the graduation ceremony I was awarded a plaque for <em>Outstanding Achievement in the Department of Computer Science.</em></p>

      <p>Over the course of my studies I took classes such as <em>Data Structures and Algorithms</em>, <em>Requirements and Specification</em>, <em>Validation and Verification</em>, and the required <em>Senior Project</em> course for Software Engineers. Over the span of two semesters, my Senior Project team and I were tasked with continuing a project from the previous year, Food, Resources, Expenses, and Distribution, or <acronym title="FRED">FRED</acronym> for short, is a Windows application created using WPF Forms for the Butte Food Bank to aid them in tracking information about their clients such as information necessary to be reported to the state as well as when was the last time they received food.</p>

      <p>Also during my schooling I served as the Secretary to my school's student chapter of ACM in 2017-2018 and as the President in 2018-2019. Before becoming the Secretary in 2016 I volunteered to work for one of the local museums in town, the Butte Science Mine on a project called Digital Signage. The project's vision is to bring more interactive exploration-based digital interfaces to the museum that helps children and adults learn more about a subject. Helping with that project secured my club roughly $4,000 for a future industry trip we took to Seattle where we visited companies such as Microsoft, Valve, and a couple of start ups with very few employees. As the Secretary, and again as the President, I helped my department get accredited as a testing site for the ICPC regionals meaning schools from all around Montana can commute to Butte to compete in the competition as opposed to the next closest testing site in Colorado. Many smaller schools, including ourselves, would not have been able to compete in the competition if there was not a local testing site.</p>

      <p>Outside of academics, I also really like to play computer games. My favorite games to play currently are Diablo 3, Warframe, and World of Warships. I used to be big into League of Legends as well but I don't play much anymore. However, I do like to watch professional LoL. My favorite teams have to be <a target="_blank" href="http://shop.g2esports.com">G2</a> in Europe and TSM/C9 back home in NA. I am very grateful that living in LA area allows me to go to the live events over in Santa Monica.</p>

      <p>In addition to playing games, I have also started working on my own game in my free time, starting from the ground up with my own game engine written in c++. Struggling through how to set up a game engine has let me develop a lot of respect for developers that make a new game engine for each game that they work. At the same time I can understand why developers that are just starting up a business would look towards a software solution such as Unity or UE4. Someone who has been a big help for me while I have been struggling through this project is Jon Blow. Blow is the developer who did Braid and The Witness and is currently working with his team on a new game called Soccoban as well as developing a new programming language for game design called Jai. Blow's streams where he is working on the game engine are invaluable since watching first hand how someone develops an engine or uses one is far different than reading about it in a book. Although his streams are all in Jai and my engine is currently in c++, there are a lot of parallels between the two languages and once Jai comes out for beta later this year I will be switching my engine to be in Jai instead.</p>

      <p>If you made it this far, thanks for reading through all that. There are links to my <a target="_blank" href={GitHub}>GitHub</a>, <a target="_blank" href={LinkedIn}>LinkedIn</a>, and a download for my <a href="/resume" download="Michael_Fryer_Resume.pdf">resume</a> here as well as in the footer.</p>

    </div>
  );
}