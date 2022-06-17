import React, { useEffect } from "react";
import { Link, Route, useHistory, useParams } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import classes from "./QuoteDetail.module.css";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const DUMMY_QUOTES = [
  {
    id: "q1",
    author: "Amey A.",
    text: "Learning React Is Fun.",
  },
  {
    id: "q2",
    author: "Diya P",
    text: "Learning React Is Boring.",
  },
  {
    id: "q3",
    text: "No it really is.",
    author: "Amey A.",
  },
];

const QuoteDetail = (props) => {
  const history = useHistory();
  const params = useParams();
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status==='pending') {
    return <div className="centered"><LoadingSpinner /></div>
  }
  const quote = DUMMY_QUOTES.find((quote) => loadedQuote.id === params.quoteId);

  if (error) {
    return <p className="centered">{error}</p>
  }

  if (!loadedQuote.text) {
    return <div>Quote not found</div>
  }

  if (!quote) {
    return (
      <section>
        <h1>Sorry! Quote is not found</h1>
      </section>
    );
    history.push(`/quotes/quote/${params.quoteId}/comments`);
  }
  return (
    <div>
      <Link to="/quotes">
        <p>back</p>
      </Link>
      <HighlightedQuote author={loadedQuote.author} text={loadedQuote.text} />
      <Route path={`/quotes/${params.quoteId}`} exact>
        <div className="centered">
          <Link to={`/quotes/${params.quoteId}/comments`} className="btn--flat">
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`/quotes/${params.quoteId}/comments`}>
        <Comments />
      </Route>
    </div>
  );
};

export default QuoteDetail;
