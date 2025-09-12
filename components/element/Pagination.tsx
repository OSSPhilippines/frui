export type PaginationProps = {
  total?: number,
  skip?: number, 
  take?: number, 
  radius?: number,
  paginate?: Function
};

/**
 * Paginataion Components
 */
export default function Pagination(props: PaginationProps) {
  //hooks
  const { 
    total = 0, skip = 0, take = 50, 
    radius = 2, paginate = () => {} 
  } = props;
  
  const current = Math.floor(skip / take) + 1;
  const max = Math.ceil(total / take);
  const previous = current > 1;
  const next = current < max;
  const refresh = (page: number) => paginate(Math.max(page - 1, 0) * take);
  const pages: number[] = [];
  for (let i = current - 1 - radius; i < max; i++) {
    if (i >= 0 && i < current + radius) {
      pages.push(i + 1);
    }
  }

  if (total <= take) return null;

  //render
  return (
    <div className="pagination">
      {previous && (
        <button className="prev" onClick={() => refresh(current - 1)}>
          <i className="fas fa-chevron-left"></i>
        </button>
      )}
      {pages.map((page, i) => (
        <button
          key={i}
          onClick={() => refresh(page)}
          className={`page ${page === current ? 'active' : ''}`}
        >
          {page}
        </button>
      ))}
      {next && (
        <button className="next" onClick={() => refresh(current + 1)}>
          <i className="fas fa-chevron-right"></i>
        </button>
      )}
    </div>
  );
};