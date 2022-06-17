import React from "react";
import { useEffect } from "react";
import QuoteForm from "../components/quotes/QuoteForm";
import { useHistory } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const CreateQuotes = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();
  useEffect(() => {
    if (status==='completed') {
      history.push("/quotes");
    }
  },[status, history])
  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData)
    
  };
  return (
    <section>
      <h1>Add Quote</h1>
      <QuoteForm isLoading={status==='pending'} onAddQuote={addQuoteHandler} />
    </section>
  );
};

export default CreateQuotes;
