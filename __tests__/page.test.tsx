"use client";
import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../app/page";

// Test unitaires suggérés par ChatGPT
describe("Composant Home - Calculatrice Fractale Vision", () => {
  it("affiche le champ de saisie et les boutons", () => {
    render(<Home />);
    expect(screen.getByPlaceholderText("Calcul ici")).toBeInstanceOf(HTMLInputElement);
    const boutons = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"];
    boutons.forEach((bouton) => {
      expect(screen.getByText(bouton)).toBeInstanceOf(HTMLButtonElement);
    });
  });

  it("met à jour l'entrée lorsque l'on appuie sur les boutons", () => {
    render(<Home />);
    const bouton1 = screen.getByText("1");
    const bouton2 = screen.getByText("2");
    const champSaisie = screen.getByPlaceholderText("Calcul ici") as HTMLInputElement;

    fireEvent.click(bouton1);
    fireEvent.click(bouton2);
    expect(champSaisie.value).toBe("12");
  });

  it("effectue un calcul correct lors de l'appui sur '='", () => {
    render(<Home />);
    const bouton1 = screen.getByText("1");
    const boutonPlus = screen.getByText("+");
    const bouton2 = screen.getByText("2");
    const boutonEgal = screen.getByText("=");
    const champSaisie = screen.getByPlaceholderText("Calcul ici") as HTMLInputElement;

    fireEvent.click(bouton1);
    fireEvent.click(boutonPlus);
    fireEvent.click(bouton2);
    fireEvent.click(boutonEgal);
    expect(champSaisie.value).toBe("3");
  });

  it("réinitialise l'entrée lorsque le bouton 'Clear' est pressé", () => {
    render(<Home />);
    const bouton1 = screen.getByText("1");
    const boutonClear = screen.getByText("Clear");
    const champSaisie = screen.getByPlaceholderText("Calcul ici") as HTMLInputElement;

    fireEvent.click(bouton1);
    fireEvent.click(boutonClear);
    expect(champSaisie.value).toBe("");
  });

  it("affiche 'Error' pour une entrée invalide", () => {
    render(<Home />);
    const champSaisie = screen.getByPlaceholderText("Calcul ici") as HTMLInputElement;
    fireEvent.change(champSaisie, { target: { value: "1++" } });

    const boutonEgal = screen.getByText("=");
    fireEvent.click(boutonEgal);
    expect(champSaisie.value).toBe("Error");
  });
});
