import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cards, Evidence, Quote, Rebuttal } from "../../types";

type CardsState = {
  loading: boolean,
  cards: Cards,
};

const initialState = {
  loading: false,
  cards: {evidences: [], rebuttals: [], quotes: []},
} as CardsState;

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<Cards>) => {
      state.cards = action.payload;
    },
    setCardsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    addEvidenceCard: (state, action: PayloadAction<Evidence>) => {
      state.cards.evidences.push(action.payload);
    },
    removeEvidenceCard: (state, action: PayloadAction<string>) => {
      state.cards.evidences
      .filter((card) => (card.cardID == action.payload))
      .forEach((card) => state.cards.evidences.splice(state.cards.evidences.indexOf(card), 1));
    },
    editEvidenceCard: (state, action: PayloadAction<Evidence>) => {
      const index = state.cards.evidences.findIndex(((card) => card.cardID == action.payload.cardID));
      state.cards.evidences[index] = action.payload;
    },

    addQuoteCard: (state, action: PayloadAction<Quote>) => {
      state.cards.quotes.push(action.payload);
    },
    removeQuoteCard: (state, action: PayloadAction<string>) => {
      state.cards.quotes
      .filter((card) => (card.cardID == action.payload))
      .forEach((card) => state.cards.quotes.splice(state.cards.quotes.indexOf(card), 1));
    },
    editQuoteCard: (state, action: PayloadAction<Quote>) => {
      const index = state.cards.quotes.findIndex(((card) => card.cardID == action.payload.cardID));
      state.cards.quotes[index] = action.payload;
    },

    addRebuttalCard: (state, action: PayloadAction<Rebuttal>) => {
      state.cards.rebuttals.push(action.payload);
    },
    removeRebuttalCard: (state, action: PayloadAction<string>) => {
      state.cards.rebuttals
      .filter((card) => (card.cardID == action.payload))
      .forEach((card) => state.cards.rebuttals.splice(state.cards.rebuttals.indexOf(card), 1));
    },
    editRebuttalCard: (state, action: PayloadAction<Rebuttal>) => {
      const index = state.cards.rebuttals.findIndex(((card) => card.cardID == action.payload.cardID));
      state.cards.rebuttals[index] = action.payload;
    },
  },
});

export const {
  setCards,
  setCardsLoading,
   
  addEvidenceCard,
  removeEvidenceCard,
  editEvidenceCard,

  addQuoteCard,
  editQuoteCard,
  removeQuoteCard,

  addRebuttalCard,
  editRebuttalCard,
  removeRebuttalCard,
} = cardsSlice.actions;

export default cardsSlice;