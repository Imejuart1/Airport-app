//This component is for the results displayed in the home page
import "./Pagination.css"

function Pagination({ itemsPerPage, totalItems, currentPage, setCurrentPage }) {
  // Determine the total number of pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Determine the range of items currently being displayed
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShowing = `${indexOfFirstItem + 1}-${indexOfLastItem > totalItems ? totalItems : indexOfLastItem} / ${totalItems}`;

  // Determine the range of pages to show
  const maxPagesToShow = 6;
  const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
  let startPage = Math.max(1, currentPage - halfMaxPagesToShow);
  let endPage = Math.min(startPage + maxPagesToShow - 1, pageNumbers.length);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  // Render the pagination buttons
  return (
    <nav className="pagination-container">
      <div className="showing-container">{currentShowing}</div>
      <ul className="pagination">
        {startPage > 1 && (
          <li key="first" className="page-item">
            <button className="page-link" onClick={() => setCurrentPage(1)}>
              1
            </button>
          </li>
        )}
        {startPage > 2 && <li key="ellipsis-start">...</li>}
        {pageNumbers.slice(startPage - 1, endPage).map((number) => (
          <li key={number} className="page-item">
            <button
              className={number === currentPage ? "page-link active" : "page-link"}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          </li>
        ))}
        {endPage < pageNumbers.length - 1 && <li key="ellipsis-end">...</li>}
        {endPage < pageNumbers.length && (
          <li key="last" className="page-item">
            <button className="page-link" onClick={() => setCurrentPage(pageNumbers.length)}>
              {pageNumbers.length}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination
