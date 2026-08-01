import PlaceholderThumb from './PlaceholderThumb';

export default function MenuItem({ item }) {
  return (
    <div className={`mxd-item${item.soldOut ? ' is-sold-out' : ''}`}>
      {item.soldOut && <span className="mxd-soldout-badge">خلص</span>}
      <div className="mxd-item-img">
        {item.image
          ? <img src={item.image} alt={item.name} loading="lazy" />
          : <PlaceholderThumb />
        }
      </div>
      <div className="mxd-item-left">
        <div className="mxd-item-name">{item.name}</div>
        {item.desc && <div className="mxd-item-desc">{item.desc}</div>}
      </div>
      <div className="mxd-item-price">{item.price} ج.م</div>
    </div>
  );
}
