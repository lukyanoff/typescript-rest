/// <reference path="./collections.d.ts" />
"use strict";

import {HttpMethod} from "./server-types"

/**
 * Metadata for REST service classes
 */
export class ServiceClass {
	constructor(targetClass: Function) {
		this.targetClass = targetClass;
		this.methods = new Map<string,ServiceMethod>();
	}

	targetClass: Function;
	path: string;
	methods: Map<string,ServiceMethod>;
	languages: Array<string>;
	accepts: Array<string>;
	properties: Map<string,ParamType>;
	
	addProperty(key: string, paramType: ParamType) {
		if (!this.hasProperties()) {
			this.properties = new Map<string,ParamType>();
		}
		this.properties.set(key, paramType);
	}

	hasProperties(): boolean {
		return (this.properties && this.properties.size > 0);
	}
}

/**
 * Metadata for REST service methods
 */
export class ServiceMethod {
	name: string;
	path: string;
	resolvedPath: string;
	httpMethod: HttpMethod;
	parameters: Array<MethodParam> = new Array<MethodParam>();
	mustParseCookies: boolean = false;
	files: Array<FileParam> = new Array<FileParam>();
	mustParseBody: boolean = false;
	mustParseForms: boolean = false;
	acceptMultiTypedParam: boolean = false;
	languages: Array<string>;
	accepts: Array<string>;
	resolvedLanguages: Array<string>;
	resolvedAccepts: Array<string>;
}

/**
 * Metadata for File parameters on REST methods
 */
export class FileParam {
	constructor(name: string, singleFile: boolean) {
		this.name = name;
		this.singleFile = singleFile;
	}

	name: string;
	singleFile: boolean;
}

/**
 * Metadata for REST service method parameters
 */
export class MethodParam {
	constructor(name: string, type: Function, paramType: ParamType) {
		this.name = name;
		this.type = type;
		this.paramType = paramType;
	}

	name: string;
	type: Function;
	paramType: ParamType;
}

/**
 * Enumeration of accepted parameter types
 */
export enum ParamType {
	path,
	query,
	header,
	cookie,
	form,
	body,
	param,
	file, 
	files, 
	context,
	context_request,
	context_response,
	context_next, 
	context_accept,
	context_accept_language
}
