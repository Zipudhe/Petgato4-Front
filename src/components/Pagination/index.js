import PaginationButton from '../PaginationButton';

import './styles.css';

export default function Pagination({ actualPage=1, totalPages=1, previous=null, next=null, specific=null }){
    return (
        <div>
        {actualPage === 1 ? (
            <div className="container-pagination">
                <PaginationButton text={'«'} disabled={true} />
                <PaginationButton text={1} selected={true} onClick={previous} />
                {totalPages >= 2 ? (<PaginationButton text={2} onClick={next} />)
                : (<PaginationButton text={2} disabled={true}/>)}
                {totalPages >= 3 ? (<PaginationButton text={3} onClick={specific} />)
                : (<PaginationButton text={3} disabled={true}/>)}
                {actualPage < totalPages ? (<PaginationButton text={'»'} onClick={next} />)
                : (<PaginationButton text={'»'} disabled={true} />)}
            </div>
        ) : (
        actualPage === 2 ? (
            <div className="container-pagination">
                <PaginationButton text={'«'} onClick={previous} />
                <PaginationButton text={1} onClick={previous} />
                <PaginationButton text={2} selected={true} />
                {totalPages >= 3 ? (<PaginationButton text={3} onClick={next} />)
                : (<PaginationButton text={3} disabled={true} />)}
                {actualPage < totalPages ? (<PaginationButton text={'»'} onClick={next} />)
                : (<PaginationButton text={'»'} disabled={true} />)}
            </div>
        ) : (
        actualPage === totalPages ? (
            <div className="container-pagination">
                <PaginationButton text={'«'} onClick={previous} />
                <PaginationButton text={actualPage-2} onClick={specific} />
                <PaginationButton text={actualPage-1} onClick={previous} />
                <PaginationButton text={actualPage} selected={true} />
                <PaginationButton text={'»'} disabled={true} />
            </div>
        ) : (
            <div className="container-pagination">
                <PaginationButton text={'«'} onClick={previous} />
                <PaginationButton text={actualPage-1} onClick={previous} />
                <PaginationButton text={actualPage} selected={true} />
                <PaginationButton text={actualPage+1} onClick={next} />
                <PaginationButton text={'»'} onClick={next} onClick={next} />
            </div>
        )
        ))}
        </div>
    );
}