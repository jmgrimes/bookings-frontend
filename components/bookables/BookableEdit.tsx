import { useRouter } from "next/router";
import { FunctionComponent } from "react";

import { BookableForm } from "./BookableForm";
import { CardLoading, ViewError } from "../application";
import { Bookable, useBookable } from "../../features/bookables";

type BookableEditReadyProps = {
  bookable: Bookable
}

const BookableEditReady: FunctionComponent<BookableEditReadyProps> = (props: BookableEditReadyProps) => {
  const { bookable } = props;
  const router = useRouter();
  return (
    <BookableForm bookable={bookable}
                  onSave={() => router.push(`/bookables/${bookable.id}`)}
                  onDelete={() => router.push(`/bookables/${bookable.id}`)}
                  onCancel={() => router.push(`/bookables/${bookable.id}`)}/>
  );
}

export const BookableEdit: FunctionComponent = () => {
  const router = useRouter();
  const id = parseInt(router.query.id as string, 10);
  const { data, loading, error } = useBookable(id);
  if (loading) {
    return (
      <CardLoading/>
    );
  }
  if (error) {
    return (
      <ViewError title="An error occurred while loading the bookable." message={error.message}/>
    );
  }
  if (!data) {
    return (
      <ViewError title="An error occurred while loading the bookable."
                 message="An unexpected error occurred: bookable was not available when loading completed."
      />
    );
  }
  return (
    <BookableEditReady bookable={data.bookable}/>
  );
}