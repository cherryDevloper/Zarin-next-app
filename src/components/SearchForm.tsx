import { searchMovie } from "@/app/actions";
import { Button, Input } from "antd";

export function SearchForm() {
  return (
    <form
      className="flex w-full max-w-sm items-center gap-2 self-center lg:max-w-[50%]"
      action={searchMovie}
    >
      <Input name="title" type="text" placeholder="Title" />
      <Button htmlType="submit">Search</Button>
    </form>
  );
}
