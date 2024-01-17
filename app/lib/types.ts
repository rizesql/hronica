export type Tuple2<T> = [T, T];
export type Tuple3<T> = [T, T, T];
export type Tuple5<T> = [T, T, T, T, T];
export type Tuple10<T> = [T, T, T, T, T, T, T, T, T, T];

export function isDefined<Value>(value: Value | undefined | null): value is Value {
	return value !== null && value !== undefined;
}

export function ensureDefined<Value>(value: Value | undefined | null) {
	if (!isDefined(value)) throw new Error(`Expected non-null, got null or undefined`);

	return value;
}

export type Prettify<T> = {
	[K in keyof T]: T[K];
	// eslint-disable-next-line @typescript-eslint/ban-types
} & {};
