import { assignDefinedObjectValues } from "./assignDefinedObjectValues";

describe("[UNIT] assignDefinedObjectValues", () => {
  it("should returns a new object without undefined, empty or null fields", () => {
    const data: any = {
      name: "John Dee",
      email: "",
      password: undefined,
      cep: null,
    };

    const formattedData = assignDefinedObjectValues(data);

    expect(formattedData).toEqual({ name: data.name });
    expect(formattedData).not.toEqual(data);
  });

  it("should returns an empty object when receive undefined or null", () => {
    const data: null | undefined = null;

    const formattedData = assignDefinedObjectValues(data);

    expect(formattedData).toEqual({});
    expect(formattedData).not.toEqual(data);
  });
});
