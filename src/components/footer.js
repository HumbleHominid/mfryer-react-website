import { Email, GitHub, Resume } from '../refLinks';

export default function Footer() {
  return (
    <footer id="application-footer" className="mx-auto w-100">
      <dl className="dl-horizontal row">
        <dt className="col-6 text-right">Email</dt>
        <dd className="col-6">{Email}</dd>
        <dt className="col-6 text-right">GitHub</dt>
        <dd className="col-6"><a target="_blank" rel="noreferrer" href={GitHub}>GitHub</a></dd>
        <dt className="col-6 text-right">Resume</dt>
        <dd className="col-6"><a target="_blank" rel="noreferrer" href={Resume}>Resume</a></dd>
      </dl>
    </footer>
  );
}