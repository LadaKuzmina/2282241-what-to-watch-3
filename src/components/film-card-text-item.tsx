type FilmCardTextItemType = {
  name:string;
  value: string | number;
}
function FilmCardTextItem({name, value}:FilmCardTextItemType) {
  return (
    <p className="film-card__details-item">
      <strong className="film-card__details-name">{name}</strong>
      <span className="film-card__details-value">{value}</span>
    </p>
  );
}
export default FilmCardTextItem;