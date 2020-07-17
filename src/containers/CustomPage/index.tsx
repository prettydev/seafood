import React, { useEffect, useState } from "react";
import renderHTML from "react-render-html";
import callApi from "../../apiHandler";
import { Helmet } from "react-helmet";
import { Item } from "semantic-ui-react";

function CustomPage(props) {
  const [pageData, setPageData] = useState({} as any);

  useEffect(() => {
    const slug = props.match.params.slug;
    callApi(`/page/${slug}`).then((response) => setPageData(response));
  }, []);

  return (
    <div className="container-md container-fluid my-5">
      <Helmet>
        <title>{pageData?.title}</title>
      </Helmet>
      <h1>{pageData?.title}</h1>
      <div className="d-flex row">
        {pageData?.content &&
          pageData?.content.length > 0 &&
          pageData?.content.map((item, index) => (
            <>
              {item.content && (
                <div className={"col-12"} key={`center_${index}`}>
                  {renderHTML(item.content)}
                </div>
              )}
              {item.leftColumn && (
                <div className={"col-md-6 col-sm-12"} key={`left_${index}`}>
                  {renderHTML(item.leftColumn)}
                </div>
              )}
              {item.rightColumn && (
                <div className={"col-md-6 col-sm-12"} key={`right_${index}`}>
                  {renderHTML(item.rightColumn)}
                </div>
              )}
            {item.htmlContent && (
                <div className={"col-12"} key={`right_${index}`}>
                    {renderHTML(item.htmlContent)}
                </div>
            )}
            </>
          ))}
      </div>
    </div>
  );
}

export default CustomPage;
