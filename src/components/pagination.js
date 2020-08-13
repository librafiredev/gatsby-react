import React from "react";

import { Link } from "gatsby";

import styled from "styled-components";

const PaginationWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .pagination-item {
        padding: 10px;
        display: block;;
        text-decoration: none;
    }
`;

const Pagination = ({ pages, currentPage }) => {
    const prev = Math.max(currentPage - 1, 1);
    const next = Math.min(currentPage + 1, pages.length)
    return (
        <PaginationWrap>
            {prev !== currentPage
                ?
                (
                    <Link to={pages[prev - 1].paginationPath} className="pagination-item">
                        &lt;
                    </Link>)
                :
                (
                    <div className="pagination-item">
                        &lt;
                    </div>
                )
            }

            {pages.map((page, index) => (
                <div key={index}>
                    {currentPage !== index + 1
                        ?
                        (
                            <Link to={page.paginationPath} className="pagination-item">
                                {index + 1}
                            </Link>)
                        :
                        (
                            <div className="pagination-item">
                                {index + 1}
                            </div>
                        )
                    }
                </div>
            ))}

            {next !== currentPage ?
                (
                    <Link to={pages[next - 1].paginationPath} className="pagination-item">
                        &gt;
                    </Link>
                )
                : (
                    <div className="pagination-item">
                        &gt;
                    </div>
                )
            }
        </PaginationWrap>
    )
}

export default Pagination