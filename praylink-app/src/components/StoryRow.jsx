const stories = [
  { name: 'Ma story', emoji: '＋', isAdd: true },
  { name: 'Marie', emoji: '👩🏽' },
  { name: 'David', emoji: '👨🏿' },
  { name: 'Sarah', emoji: '👩🏻' },
  { name: 'Jean', emoji: '👨🏽' },
  { name: 'Esther', emoji: '👩🏾' },
];

export default function StoryRow() {
  return (
    <div className="stories-row">
      {stories.map((story, i) => (
        <div className="story-item" key={i}>
          <div className={`story-avatar${story.isAdd ? ' story-add' : ''}`}>
            <div className="avatar-placeholder">{story.emoji}</div>
          </div>
          <span className="story-name">{story.name}</span>
        </div>
      ))}
    </div>
  );
}
