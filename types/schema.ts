import {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import { Dispatch, JSX, SetStateAction } from "react";
import { z } from "zod";

export const signupSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .min(2, "First name must have at least 2 characters")
    .regex(/^[A-Za-z]+$/, "First name must contain only letters"),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .min(2, "Last name must have at least 2 characters")
    .regex(/^[A-Za-z]+$/, "Last name must contain only letters"),

  email: z
    .string()
    .min(1, "Email is required")
    .trim()
    .email("Please enter a valid email address like name@example.com"),

  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Z]/, "At least one uppercase letter required")
    .regex(/[a-z]/, "At least one lowercase letter required")
    .regex(/[0-9]/, "At least one number required")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "At least one special character required (!@#$%^&*)"
    ),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .trim()
    .email("Please enter a valid email address like name@example.com"),

  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Z]/, "At least one uppercase letter required")
    .regex(/[a-z]/, "At least one lowercase letter required")
    .regex(/[0-9]/, "At least one number required")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "At least one special character required (!@#$%^&*)"
    ),
});

export type SignupSchemaType = z.infer<typeof signupSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;

export interface continueWithDataInterface {
  icon: JSX.Element;
  text: string;
}

export interface Product {
  title: string;
  subTitle: string;
  productCode: string;
  price: number;
  initialPrice: string;
  discountPercentage: string;
  image: string;
  pdpUrl: string;
  createdAt: Timestamp;
}

export interface ClotGeneralInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  classname?: string;
}

export interface ClotButtonProps {
  onPress?: () => void;
  classname?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

// type for the action.type (we use enum because it's a constant variable that should be available in runtime)
export enum LoadItemsKind {
  GETMORE = "GETMORE",
  NOTHINGMORE = "NOTHINGMORE",
}

// types for initial state
export type InitialStateType = {
  productItems?: Product[];
  lastVisible?: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
};

export type LoadItemsAction = InitialStateType & {
  type: LoadItemsKind;
};

export interface productServiceProps {
  limitCount: number;
  setReels: React.Dispatch<React.SetStateAction<Product[]>>;
  setLastVisible: React.Dispatch<
    React.SetStateAction<QueryDocumentSnapshot<DocumentData> | null>
  >;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
  loadItemsDispatch: React.ActionDispatch<[action: LoadItemsAction]>;
}

export interface loadingMoreItemsProps extends productServiceProps {
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
  loadingMore: boolean;
  hasMore: boolean;
  setLoadingMore: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface StickyLayoutContextType {
  stickyHeight: number;
  setStickyHeight: Dispatch<SetStateAction<number>>;
}
