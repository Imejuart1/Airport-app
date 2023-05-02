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

  // Render the pagination buttons
  return (
    <nav className="pagination-container">
      <div className="showing-container">{currentShowing}</div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              className={number === currentPage ? "page-link active" : "page-link"}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination
