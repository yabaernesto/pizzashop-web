import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Pagination } from "./pagination";

// spie
const onPageChangeCallback = vi.fn();

describe("Pagination", () => {
  // spies: sao funções que nao tem nenhum tipo de comportamento, 
  // servem para garantir que o código chegou em algum lugar. 
  // E uma função que anota dentro dela mesma quantas vezes foi chamada, 
  // com quais parametros. E uma função para saber se algum callback foi chamado ou nao

  it("should display the right amount of pages of results", () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={() => {}}
      />
    );

    expect(wrapper.getByText("Página 1 de 20")).toBeInTheDocument();
    expect(wrapper.getByText("Total de 200 item(s)")).toBeInTheDocument();
  })
  it("should be able to navigate the next page", async () => {
    const user = userEvent.setup();

    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />
    );

    const nextPageButton = wrapper.getByRole("button", {
      name: "Próxima página"
    });

    await user.click(nextPageButton);

    // expect(onPageChangeCallback).toHaveBeenCalled();
    expect(onPageChangeCallback).toHaveBeenCalledWith(1);
  })
})
