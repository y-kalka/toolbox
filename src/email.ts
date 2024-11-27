/**
 * List of domains which will ignore any dots in the local part of the address
 */
const DOMAINS_IGNORING_DOTS_IN_LOCAL_PART = [
	"google.com",
	"gmail.com",
	"googlemail.com",
];

// export class EmailAddress{
//     #localPart = "";
//     #domainPart = "";
//     #subAddress = "";

//     constructor(email: string){
//         const [localPart, domainPart] = email.trim().split("@")

//         this.#domainPart = domainPart.toLowerCase();

//         const [address, subAddress] = localPart.split("+");
//         this.#localPart = address;

//         this.setSubAddress(subAddress);
//     }

//     setSubAddress(subAddress: string | undefined | null): EmailAddress {
//         this.#subAddress = subAddress ? subAddress: "";

//         return this;
//     }

//     toSanatizedString() {}

//     toString(): string {
//         let address = this.#localPart;

//         if(this.#subAddress){
//             address+= `+${this.#subAddress}`
//         }

//         address += `@${this.#domainPart}`;

//         return address;
//     }
// }

/**
 * Adds a sub address to the local part of an email address which will be ignored by email servers
 * ```ts
 * addSubAddress("hello@world.com", "test") // "hello+test@world.com"
 * ```
 */
export function addSubAddress(email: string, subAddress: string): string {
	if (email.includes("+")) {
		throw Error("Email has already a sub address");
	}

	const [localPart, domainPart] = email.split("@");

	return `${localPart}+${subAddress}@${domainPart.toLowerCase()}`;
}

/**
 * Drops the suffix of the local part of the email address
 * ```ts
 * dropSubAddress("hello+test@world.com") // "hello@world.com"
 * ```
 */
export function dropSubAddress(email: string): string {
	let [localPart, domainPart] = email.trim().split("@");

	if (localPart === undefined) {
		throw Error("Invalid email: Local part is missing");
	}

	if (domainPart === undefined) {
		throw Error("Invalid email: Domain part is missing");
	}

	domainPart = domainPart.toLowerCase();
	localPart = localPart.split("+").at(0) as string;

	return `${localPart}@${domainPart}`;
}

/**
 * Sanatizes a email to the unique version which will be used by email servers internaly
 * ```ts
 * sanatizeEmail("he.llo+test@gmail.com") // "hello@gmail.com"
 * sanatizeEmail("he.llo+test@world.com") // "he.llo@world.com"
 * ```
 */
export function sanatizeEmail(email: string): string {
	let [localPart, domainPart] = email.trim().split("@");

	if (localPart === undefined) {
		throw Error("Invalid email: Local part is missing");
	}

	if (domainPart === undefined) {
		throw Error("Invalid email: Domain part is missing");
	}

	domainPart = domainPart.toLowerCase();
	localPart = localPart.split("+").at(0) as string; // drop the sub address

	if (DOMAINS_IGNORING_DOTS_IN_LOCAL_PART.includes(domainPart)) {
		localPart = localPart.replace(/\./g, "");
	}

	return `${localPart}@${domainPart}`;
}
