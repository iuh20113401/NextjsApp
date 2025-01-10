"use server";
import { auth, signIn, signOut } from "@/app/_lib/auth";
import { getBookings, updateGuest } from "./data-service";
import supabase from "./supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfile(formData) {
  const session = await auth();
  if (!session.user) throw new Error("You must be login!!!!!");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}/.test(nationalID))
    throw new Error("Invalid national id");
  const updateData = { nationalID, nationality, countryFlag };
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);
  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}
export async function createReservation(bookingData, formData) {
  const session = await auth();
  if (!session.user) throw new Error("You must be login!!!!!");
  const newBooking = {
    ...bookingData,
    totalPrice: bookingData.cabinPrice,
    guestId: session.user.guestId,
    observations: formData.get("observations"),
    numGuests: Number(formData.get("numGuests")),
    extrasPrice: 0,
    hasBreakfast: false,
    isPaid: false,
    status: "uncomfirmed",
  };
  const { data, error } = await supabase.from("bookings").insert([newBooking]);
  if (error) throw new Error("Booking could not be created");

  revalidatePath("/account/reservations");
  redirect("/cabins/thankyou");
}
export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session.user) throw new Error("You must be login!!!!!");
  const reservations = await getBookings(session.user.guestId);
  const bookingIds = reservations.map((booking) => booking.id);
  if (!bookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking ");
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const session = await auth();
  if (!session.user) throw new Error("You must be login!!!!!");
  const bookingId = Number(formData.get("bookingId"));
  const observations = formData.get("observations");
  const numGuests = formData.get("numGuests");
  const reservations = await getBookings(session.user.guestId);
  const bookingIds = reservations.map((booking) => booking.id);
  if (!bookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking ");
  const updateData = { numGuests, observations };
  const { data, error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) throw new Error("Booking could not be updated");
  revalidatePath("/account/profile");
  redirect("/account/reservations");
}
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
