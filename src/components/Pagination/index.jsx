import { useEffect, useState } from 'react'

const Pagination = ({
  postsPerPage,
  totalPosts,
  currentPage,
  setCurrentPage,
  pokemonFilter,maxPageNumberLimit, setMaxPageNumberLimit, minPageNumberLimit, setMinPageNumberLimit
}) => {
  const pageNumberLimit = 5
  let pageNumbers = []
  const [loading, setLoading] = useState(true)

  function initPaginate() {
    setMinPageNumberLimit(0)
    setMaxPageNumberLimit(5)
  }
  useEffect(() => {
    const promesa = new Promise((res, rej) => {
      setTimeout(() => {
        res(Pagination)
      }, 100)
    })
    promesa
      .catch((rej) => {
        console.log('There was an error in loading the Pagination')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    initPaginate();
  }, [totalPosts])

  if (pokemonFilter.length >= 1) {
    for (let i = 1; i <= Math.ceil(pokemonFilter.length / postsPerPage); i++) {
      pageNumbers.push(i)
    }
  } else {
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i)
    }
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    console.log(pageNumber)
    if (pageNumber===1) initPaginate();
    if (pageNumber===2) {
      setMinPageNumberLimit(0)
      setMaxPageNumberLimit(5)
    }
    if(pageNumber>3) {
      setMinPageNumberLimit(pageNumber-3)
      setMaxPageNumberLimit(pageNumber+2)
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  const prevButton = (e) => {
    setCurrentPage((prev) => (prev === 1 ? prev : prev - 1))
    
    if (currentPage===2) {
      setMinPageNumberLimit(0)
      setMaxPageNumberLimit(5)
    }
    if(currentPage>3) {
      setMinPageNumberLimit(currentPage-4)
      setMaxPageNumberLimit(currentPage+1)
    }
    if (currentPage - 1 === minPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  const nextButton = (e) => {
    setCurrentPage((next) => (next === pageNumbers.length ? next : next + 1))

    if(currentPage<pageNumbers.length-2 && currentPage>2) {
      setMinPageNumberLimit(currentPage-2)
      setMaxPageNumberLimit(currentPage+3)
    }

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  return (
    <>
      {loading ? null : (
        <nav className="pagination-nav">
          <button
            className={`btn-pag ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={prevButton}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <ul className="pagination">
            {pageNumbers.map(
              (number) => number < maxPageNumberLimit + 1 && number > minPageNumberLimit && (
                  <li key={number} onClick={() => paginate(number)}
                    className={`numbers ${currentPage === number ? 'active' : ''}`}>{number}</li>)
            )}
          </ul>
          <button
            className={`btn-pag ${
              currentPage === pageNumbers.length ? 'disabled' : ''
            }`}
            onClick={nextButton}
            disabled={currentPage === pageNumbers.length}
          >
            Next
          </button>
        </nav>
      )}
    </>
  )
}

export default Pagination
