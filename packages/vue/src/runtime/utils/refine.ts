import { joinURL, withLeadingSlash, withTrailingSlash } from 'ufo';

export function refinePath(path: string) {
    if (path.startsWith('/') && !path.startsWith('//')) {
        const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL));

        if (_base !== '/' && !path.startsWith(_base))
            return joinURL(_base, path);
    }
    return path;
}
