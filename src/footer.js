export default function Footer() {
  return (
    <footer id="application-footer" className="mx-auto">
      <dl className="row">
        <dt className="col text-right">Email</dt>
        <dd className="col">michael.d.fryer@gmail.com</dd>
        <div className="w-100"></div>
        <dt className="col text-right">GitHub</dt>
        <dd className="col"><a target="_blank" href="https://github.com/HumbleHominid">HumbleHominid</a></dd>
        <div className="w-100"></div>
        <dt className="col text-right">LinkedIn</dt>
        <dd className="col"><a target="_blank" href="https://www.linkedin.com/in/michael-fryer-bb017013a/">Michael Fryer</a></dd>
        <div className="w-100"></div>
        <dt className="col text-right">Resume</dt>
        <div className="col"><a href="#resume" download="Michael_Fryer_Resume.pdf">Download</a></div>
      </dl>
    </footer>
  );
}