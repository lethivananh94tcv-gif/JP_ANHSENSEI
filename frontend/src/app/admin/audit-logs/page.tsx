"use client";

import { useState, useEffect } from "react";

interface AuditLogItem {
  auditLogId: number;
  actorUserId: number;
  action: string;
  entityType: string;
  entityId: string;
  oldValue: string;
  newValue: string;
  ipAddress: string;
  correlationId: string;
  createdAt: string;
}

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedLog, setSelectedLog] = useState<AuditLogItem | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  const getHeaders = () => {
    const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token") || "";
    return {
      Authorization: `Bearer ${token}`
    };
  };

  const loadAuditLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/v1/admin/audit-logs?page=${page}&size=20`, {
        headers: getHeaders()
      });
      if (res.ok) {
        const text = await res.text();
        if (text && text.trim()) {
          try {
            const data = JSON.parse(text);
            setLogs(data.content || data.data || []);
            setTotalPages(data.totalPages || 1);
          } catch {}
        }
      }
    } catch (err: any) {
      console.warn("Lỗi tải nhật ký:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuditLogs();
  }, [page]);

  const copyCorrelationId = (id: string) => {
    navigator.clipboard.writeText(id);
    setMsg("📋 Đã sao chép Correlation ID vào clipboard!");
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-[#332A24]">
          📋 Nhật Ký Hoạt Động (Audit Logs)
        </h1>
        <p className="text-xs text-[#76685F] mt-1">
          Ghi nhận toàn bộ thao tác CSDL, thay đổi trạng thái, nạp tệp Excel &amp; khóa/mở khóa tài khoản an toàn (Append-only).
        </p>
      </div>

      {msg && (
        <div className={`p-4 rounded-xl text-xs font-semibold ${msg.startsWith("📋") ? "bg-indigo-50 text-indigo-900 border border-indigo-200" : "bg-rose-50 text-rose-900 border border-rose-200"}`}>
          {msg}
        </div>
      )}

      {/* Audit Data Table */}
      <div className="bg-[#FFFCF7] rounded-2xl border border-[#E4D9CD] shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left text-[#332A24]">
          <thead className="bg-[#FAF3EB] text-[#76685F] uppercase text-[10px] font-extrabold border-b border-[#E4D9CD]">
            <tr>
              <th className="p-3.5">ID Log</th>
              <th className="p-3.5">Actor ID</th>
              <th className="p-3.5">Hành Động</th>
              <th className="p-3.5">Thực Thể</th>
              <th className="p-3.5">Entity ID</th>
              <th className="p-3.5">IP Address</th>
              <th className="p-3.5">Correlation ID</th>
              <th className="p-3.5 text-right">Metadata Chi Tiết</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-[#76685F]">Đang tải nhật ký từ backend...</td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-[#76685F]">Chưa có nhật ký hoạt động nào.</td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.auditLogId} className="border-t border-[#E4D9CD]/50 hover:bg-[#FAF3EB]/50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-[#8B6F5A]">#{log.auditLogId}</td>
                  <td className="p-3.5 font-mono text-[#332A24]">User #{log.actorUserId || "SYSTEM"}</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 rounded bg-[#FAF3EB] text-[#C65D4B] font-mono font-bold border border-[#E4D9CD]">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3.5 font-semibold text-[#332A24]">{log.entityType}</td>
                  <td className="p-3.5 font-mono text-[#76685F]">{log.entityId || "-"}</td>
                  <td className="p-3.5 font-mono text-[#76685F]">{log.ipAddress || "127.0.0.1"}</td>
                  <td className="p-3.5 font-mono text-[10px] text-gray-500">
                    {log.correlationId ? (
                      <button
                        onClick={() => copyCorrelationId(log.correlationId)}
                        title="Bấm để copy Correlation ID"
                        className="hover:underline hover:text-[#8B6F5A]"
                      >
                        {log.correlationId.substring(0, 8)}...
                      </button>
                    ) : "-"}
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="px-3 py-1 bg-[#8B6F5A] hover:bg-[#775e4c] text-white rounded-lg font-bold text-[11px] transition-all shadow-sm"
                    >
                      🔍 Xem Chi Tiết
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-[#E4D9CD] flex justify-between items-center text-xs font-bold text-[#76685F]">
          <div>Trang {page + 1} / {totalPages}</div>
          <div className="space-x-2">
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1.5 bg-[#FAF3EB] border border-[#E4D9CD] rounded-lg disabled:opacity-50 hover:bg-[#E4D9CD] transition-colors"
            >
              Trang Trước
            </button>
            <button
              disabled={page >= totalPages - 1}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1.5 bg-[#FAF3EB] border border-[#E4D9CD] rounded-lg disabled:opacity-50 hover:bg-[#E4D9CD] transition-colors"
            >
              Trang Sau
            </button>
          </div>
        </div>
      </div>

      {/* METADATA MODAL */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#FFFCF7] rounded-2xl max-w-2xl w-full p-6 border border-[#E4D9CD] space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#E4D9CD] pb-3">
              <h3 className="text-base font-bold text-[#332A24]">
                📋 Chi Tiết Audit Log #{selectedLog.auditLogId}
              </h3>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-gray-400 hover:text-gray-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#76685F] uppercase font-bold">Hành Động:</span>
                <p className="font-mono font-bold text-[#C65D4B]">{selectedLog.action}</p>
              </div>
              <div>
                <span className="text-[#76685F] uppercase font-bold">Actor ID:</span>
                <p className="font-mono font-bold">User #{selectedLog.actorUserId}</p>
              </div>
              <div>
                <span className="text-[#76685F] uppercase font-bold">Thực Thể:</span>
                <p className="font-bold">{selectedLog.entityType} ({selectedLog.entityId || "N/A"})</p>
              </div>
              <div>
                <span className="text-[#76685F] uppercase font-bold">IP Address:</span>
                <p className="font-mono">{selectedLog.ipAddress}</p>
              </div>
            </div>

            {selectedLog.oldValue && (
              <div>
                <label className="block text-xs font-bold uppercase text-[#76685F] mb-1">Old Value:</label>
                <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-xs font-mono overflow-x-auto text-gray-700 dark:text-gray-300">
                  {selectedLog.oldValue}
                </pre>
              </div>
            )}

            {selectedLog.newValue && (
              <div>
                <label className="block text-xs font-bold uppercase text-[#76685F] mb-1">New Value (Chi tiết thay đổi):</label>
                <pre className="p-3 bg-[#FAF3EB] border border-[#E4D9CD] rounded-xl text-xs font-mono overflow-x-auto text-[#332A24]">
                  {selectedLog.newValue}
                </pre>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 bg-[#8B6F5A] text-white text-xs font-bold rounded-xl hover:bg-[#775e4c]"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
