import { useNavigate } from 'react-router-dom';

export default function ChurchCover() {
  const navigate = useNavigate();

  return (
    <div className="church-cover">
      <div className="church-cover-gradient"></div>
      <div className="church-cover-overlay"></div>
      <button className="church-cover-back" onClick={() => navigate('/')}>←</button>
    </div>
  );
}
