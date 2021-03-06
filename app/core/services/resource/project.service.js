import ResourceService from './resource.service';
import axios from 'axios';
import difference from 'lodash/difference';
import { serialize } from '../../utils/url';

export default class ProjectService extends ResourceService {
    constructor(params = {}) {
        super();
        this.params = params;
    }

    /**
     * @param id
     * @returns {string}
     */
    getItemRequestUri(id) {
        return `projects/show?id=${id}`;
    }

    /**
     * @param id
     * @returns {Promise<AxiosResponse<T>>}
     */
    getItem(id) {
        return axios.get(this.getItemRequestUri(id) + '&' + serialize({ with: ['users'] }));
    }

    /**
     * @returns {Promise<AxiosResponse<T>>}
     */
    getAll() {
        return axios.get('projects/list?' + serialize(this.params));
    }

    /**
     * @param id
     * @returns {Promise<AxiosResponse<T>>}
     */
    deleteItem(id) {
        return axios.post('projects/remove', { id });
    }

    /**
     *
     * @param filters
     * @returns {Promise<AxiosResponse<T>>}
     */
    getWithFilters(filters, config = {}) {
        return axios.post('projects/list', filters, config);
    }

    /**
     * @param data
     * @param isNew
     * @returns {Promise<AxiosResponse<T>>}
     */
    save(data, isNew = false) {
        return axios.post(`projects/${isNew ? 'create' : 'edit'}`, data);
    }

    bulkEditMembers(data) {
        return axios.post('project-members/bulk-edit', data);
    }

    /**
     *
     * @returns {string}
     */
    getOptionLabelKey() {
        return 'name';
    }
}
