
import {snakeToCamel, formatClassName, snakeToKabab} from './helper'

export const service = (name: string) => `import { AxiosResponse } from 'axios';

import * as models from '../models';
import * as repositories from '../repositories';
import { Frozen, Helper, Http } from '../shared';
import * as typings from '../shared/common';
import { generateMessages } from '../utils';

/**
 * ${formatClassName(snakeToCamel(name, ' '))} service class
 */
@Frozen
export class ${formatClassName(snakeToCamel(name, ''))}Service extends Helper {
    public __http: Http;

    /**
     *
     * @param http
     */
    public constructor(
        public __repo: typeof repositories.${snakeToCamel(name, '')}Repository,
        http: typeof Http
    ) {
        super();
        this.__http = new http();
    }

}`

export const controller = (name: string) => `import { NextFunction, Request, RequestHandler, Response } from 'express';

import { ${formatClassName(snakeToCamel(name, ''))}Service } from '../services/${snakeToKabab(name)}.service';
import { Frozen } from '../shared';
import { ANY } from '../shared/common';
import { generateMessages } from '../utils/generate-message';

@Frozen
export class ${formatClassName(snakeToCamel(name, ''))}Controller {

    /**
     *
     * @param __service
     */
    public constructor(
        public __service: ${formatClassName(snakeToCamel(name, ''))}Service
    ) {
    }

}`

export const model = (name: string) => `import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

export interface ${name}I {
    created_at: Date;
    created_by: number;
    deleted_at: Date;
    id: number;
    updated_at: Date;
    updated_by: number;
}

@Table({
    modelName: '${name}',
    tableName: '${name}',
    timestamps: false
})
export class ${name} extends Model<${name}I> {

    @Column
    public created_at: Date;

    @Column
    public created_by: number;

    @Column
    public deleted_at: Date;

    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @Column
    public updated_at: Date;

    @Column
    public updated_by: number;
}`

export const respository = (name: string) => `import { ${name} } from '../models';
import { BaseRepository } from '../shared/base-repository';

/**
 * ${formatClassName(snakeToCamel(name, ' '))} Repository Class
 */
export class ${formatClassName(snakeToCamel(name, ''))}Repository extends BaseRepository<${name}> {
    /**
     * constructor
     * @param ${snakeToCamel(name, '')}Repository
     */
    public constructor(protected ${snakeToCamel(name, '')}Repository: typeof ${name}) {
        super(${snakeToCamel(name, '')}Repository);
    }

}`
