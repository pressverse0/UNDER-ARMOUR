<?php

namespace App\Http\Middleware;

use App\Services\LogService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminAuthorization
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Check if user is authenticated
        if (!$user) {
            LogService::logSecurityEvent(
                'Unauthorized admin access attempt',
                null,
                'No authentication token provided',
                true
            );

            return response()->json([
                'message' => 'Unauthenticated',
            ], 401);
        }

        // Check if user is admin (check for admin role or is_admin flag)
        // Assuming users table has is_admin boolean or role field
        if (!$this->isAdmin($user)) {
            LogService::logSecurityEvent(
                'Unauthorized admin access attempt',
                $user->id,
                'User does not have admin role',
                true
            );

            return response()->json([
                'message' => 'Unauthorized. Admin access required.',
            ], 403);
        }

        // Log successful admin access
        LogService::logAuditEvent(
            $user->id,
            'admin_access',
            'admin_endpoint',
            0,
            ['path' => $request->getPathInfo()]
        );

        return $next($request);
    }

    /**
     * Check if user is admin
     */
    private function isAdmin($user): bool
    {
        // Check for is_admin attribute (if added to users table)
        if (isset($user->is_admin) && $user->is_admin) {
            return true;
        }

        // Check for admin role (if using roles)
        if (method_exists($user, 'hasRole') && $user->hasRole('admin')) {
            return true;
        }

        // Check for admin permission
        if (method_exists($user, 'hasPermission') && $user->hasPermission('admin')) {
            return true;
        }

        return false;
    }
}
