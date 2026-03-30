<?php

declare(strict_types=1);

if (!function_exists('app_base_path')) {
    function app_base_path(): string
    {
        $scriptName = str_replace('\\', '/', $_SERVER['SCRIPT_NAME'] ?? '');
        $scriptDir = rtrim(dirname($scriptName), '/');

        if ($scriptDir === '' || $scriptDir === '.') {
            $scriptDir = '';
        }

        if (str_ends_with($scriptDir, '/pages')) {
            $scriptDir = substr($scriptDir, 0, -6);
        }

        return $scriptDir === '' ? '/' : $scriptDir;
    }
}

if (!function_exists('app_url')) {
    function app_url(string $path = ''): string
    {
        $base = app_base_path();
        $normalizedPath = ltrim($path, '/');

        if ($normalizedPath === '') {
            return $base;
        }

        if ($base === '/') {
            return '/' . $normalizedPath;
        }

        return rtrim($base, '/') . '/' . $normalizedPath;
    }
}
