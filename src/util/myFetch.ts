export const myFetch = async <T>(
	input: string | URL | globalThis.Request,
	init?: RequestInit,
): Promise<T> => {
	const response = await fetch(input, {
		...init,
		headers: {
			...init?.headers,
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(`Request failed: ${response.statusText}`);
	}

	return response.json();
};
