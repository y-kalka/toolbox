import type { webcrypto } from "node:crypto";

/**
 * List of domains which will ignore any dots in the local part of the address
 */
const DOMAINS_IGNORING_DOTS_IN_LOCAL_PART = [
	"google.com",
	"gmail.com",
	"googlemail.com",
];

interface ParsedEmailAddress {
	address: string;
	subAddress: string;
	domain: string;
}

function parse(email: string): ParsedEmailAddress {
	if (!email || typeof email !== "string") {
		throw Error("Invalid email address");
	}

	const [localPart, domainPart] = email.trim().split("@");
	const [address, subAddress] = localPart.split("+");

	if (!address) {
		throw Error("Email has no address");
	}

	if (!domainPart) {
		throw Error("Email has no domain");
	}

	return {
		address: address || "",
		subAddress: subAddress || "",
		domain: domainPart.toLowerCase(),
	};
}

function format(parsed: ParsedEmailAddress): string {
	let email = parsed.address;

	if (parsed.subAddress) {
		email += `+${parsed.subAddress}`;
	}

	email += `@${parsed.domain}`;

	return email;
}

/**
 * Adds a sub address to the local part of an email address which will be ignored by email servers
 * ```ts
 * addSubAddress("hello@world.com", "test") // "hello+test@world.com"
 * ```
 */
export function addSubAddress(email: string, subAddress: string): string {
	const parsed = parse(email);

	if (parsed.subAddress) {
		throw Error("Email has already a sub address");
	}

	parsed.subAddress = subAddress;

	return format(parsed);
}

/**
 * Sets the sub address of the local part to the given value
 * ```ts
 * setSubAddress("hello@world.com", "test") // "hello+test@world.com"
 * setSubAddress("hello+hello@world.com", "test") // "hello+test@world.com"
 * ```
 */
export function setSubAddress(email: string, subAddress: string): string {
	const parsed = parse(email);

	parsed.subAddress = subAddress;

	return format(parsed);
}

/**
 * Drops the suffix of the local part of the email address
 * ```ts
 * dropSubAddress("hello+test@world.com") // "hello@world.com"
 * ```
 */
export function dropSubAddress(email: string): string {
	const parsed = parse(email);

	parsed.subAddress = "";

	return format(parsed);
}

/**
 * Sanatizes a email to the unique version which will be used by email servers internaly
 * ```ts
 * sanatizeEmail("he.llo+test@gmail.com") // "hello@gmail.com"
 * sanatizeEmail("he.llo+test@world.com") // "he.llo@world.com"
 * ```
 */
export function sanatizeEmail(email: string): string {
	const parsed = parse(email);

	if (DOMAINS_IGNORING_DOTS_IN_LOCAL_PART.includes(parsed.domain)) {
		parsed.address = parsed.address.replace(/\./g, "");
	}

	return `${parsed.address}@${parsed.domain}`;
}

interface FingerPrintOptions {
	/**
	 * @default "SHA-1"
	 */
	algorithm?: webcrypto.AlgorithmIdentifier;
}

export async function fingerprint(
	email: string,
	options?: FingerPrintOptions,
): Promise<string> {
	const sanatized = sanatizeEmail(email).toLowerCase();

	const sourceBytes = new TextEncoder().encode(sanatized);
	const hashBuffer = await crypto.subtle.digest(
		options?.algorithm || "SHA-1",
		sourceBytes,
	);

	return btoa(
		new Uint8Array(hashBuffer).reduce(
			(data, byte) => data + String.fromCharCode(byte),
			"",
		),
	);
}
