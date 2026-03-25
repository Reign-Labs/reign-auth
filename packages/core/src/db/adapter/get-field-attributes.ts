import { ReignAuthError } from "../../error";
import type { ReignAuthOptions } from "../../types";
import type { ReignAuthDBSchema } from "../type";
import { initGetDefaultFieldName } from "./get-default-field-name";
import { initGetDefaultModelName } from "./get-default-model-name";
import { initGetIdField } from "./get-id-field";

export const initGetFieldAttributes = ({
	usePlural,
	schema,
	options,
	customIdGenerator,
	disableIdGeneration,
}: {
	usePlural?: boolean;
	schema: ReignAuthDBSchema;
	options: ReignAuthOptions;
	disableIdGeneration?: boolean;
	customIdGenerator?: ((props: { model: string }) => string) | undefined;
}) => {
	const getDefaultModelName = initGetDefaultModelName({
		usePlural,
		schema,
	});

	const getDefaultFieldName = initGetDefaultFieldName({
		usePlural,
		schema,
	});

	const idField = initGetIdField({
		usePlural,
		schema,
		options,
		customIdGenerator,
		disableIdGeneration,
	});

	const getFieldAttributes = ({
		model,
		field,
	}: {
		model: string;
		field: string;
	}) => {
		const defaultModelName = getDefaultModelName(model);
		const defaultFieldName = getDefaultFieldName({
			field: field,
			model: defaultModelName,
		});

		const fields = schema[defaultModelName]!.fields;
		fields.id = idField({ customModelName: defaultModelName });
		const fieldAttributes = fields[defaultFieldName];
		if (!fieldAttributes) {
			throw new ReignAuthError(`Field ${field} not found in model ${model}`);
		}
		return fieldAttributes;
	};

	return getFieldAttributes;
};
