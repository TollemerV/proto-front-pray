import ChurchCover from '../components/church/ChurchCover';
import ChurchInfo from '../components/church/ChurchInfo';
import ChurchTabs from '../components/church/ChurchTabs';

export default function Communities() {
  return (
    <>
      <ChurchCover />
      <ChurchInfo />
      <ChurchTabs />
      <div style={{ height: 20 }}></div>
    </>
  );
}
